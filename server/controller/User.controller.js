const sendVerificationCode = require("../middleware/email/sendVerificationCode");
const {userModel,messageModel} = require("../models/userModel.js");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const cloudinary = require("cloudinary").v2;
const dotenv = require('dotenv')

dotenv.config()
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});


const register = async (req, res) => {
  const { name, email, password, cpassword } = req.body;
  
  if (!name || !email || !password || !cpassword ) {
    return res.status(202).json(`required cardinalities`);
  }
  if (password !== cpassword) {
    return res.status(400).json(`Passwords do not match`);
  }
  try {
    const hashedpassword = bcrypt.hashSync(password, 10); // hash password
    const verificationcode = Math.floor(
      100000 + Math.random() * 900000
    ).toString(); //6 digit code
    const isVerified = "false";
    const user = await userModel.findOne({ email });
    if (user) {
      res.status(201).json({ message: "** User Already Registered" });
      return console.log(`user already registered`);
    }
    sendVerificationCode(email, verificationcode);

    const newUser = await new userModel({
      name,
      email,
      password: hashedpassword,
      verificationcode,
      isVerified,
    });
    await newUser.save();
    res.status(200).json({ message: "User registered successfully" });
    console.log(`name:${name} email:${email}`);
    console.log("User registered successfully");
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to register user" });
  }
};

const verifyOTP = async (req, res) => {
  const { otp } = req.body;
  if (!otp || otp.length !== 6) {
    return res.status(400).send("OTP are required");
  }
  try {
    const user = await userModel.findOne({ verificationcode: otp });

    if (!user) {
      return res.status(404).send("Invalid OTP");
    }

    if (user.verificationcode === otp) {
      user.isVerified = "true";
      const token = jwt.sign(
        { id: user._id, email: user.email },
        process.env.SECRET_KEY
      );
      user.token = token;
      user.verificationcode = null;
      await user.save();
      res.status(200).json({ message: "OTP verified successfully" });
      console.log(`OTP verified successfully`);
    } else {
      res.status(400).send("Invalid OTP");
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to verify OTP" });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid User" });
    }
    const token = user.token;
    if (!token) {
      await userModel.deleteOne({ _id: user._id });
      return res.status(400).json({ message: "Invalid User Token" });
    }

    const hashedpassword = await bcrypt.compare(password, user.password);
    if (!hashedpassword) {
      return res.status(400).json({ message: "Incorrect Password" });
    }

    const newToken = jwt.sign(
      { email: user.email, id: user._id },
      process.env.SECRET_KEY
    );
    user.isOnline= true
    user.token = newToken;
    await user.save();

    res.cookie("jwt", user.token, {
      httpOnly: true,
      sameSite: "none", 
      secure: true, 
      maxAge: 60 * 60 * 1000, // 1 hour
      // maxAge:  60000, // 1 min
    });
    return res.status(200).json({ message: "Login Successfully" });
  } catch (error) {
    console.error(error);
    return res.status(400).json({ message: "server Error" });
  }
};

const dashboard = async (req, res) => {
  const token = req.cookies.jwt;
  if (!token) {
    return res.status(400).json({ message: "Token missing" });
  }

  const  isValid = jwt.verify(token, process.env.SECRET_KEY);
 if (!isValid) {
  
   return res.status(400).json({ message: "Invalid token" });
 }

  try {
    const user = await userModel.findOne({ _id: isValid.id });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }
    res.status(200).json({ message: "Data fetched successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getUser =  (req, res) => {
  try {
    const user = req.user;
    res.status(200).json({
      name: user.name,
      isOnline: user.isOnline,
      id:user._id,
      email:user.email,
      profileImage:user.profileImage
    });
  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};
const imageUpdate = async (req, res) => {
  try {
    const user = req.user;
  
   const { profileImage } = req.body; // Base64 string of the image

    // Upload the image to Cloudinary
    const result = await cloudinary.uploader.upload(profileImage, {
      folder: "profile_images", // Specify folder in Cloudinary
    });

    // Get the secure URL
    const profileImageUrl = result.secure_url;

    // Save URL to your database (pseudo code)
    const getuser = await userModel.findByIdAndUpdate({_id:user.id} );
    getuser.profileImage=profileImageUrl
    await getuser.save()
    res.status(200).json({ message: "Profile image updated successfully!", profileImageUrl });



  } catch (error) {
    console.error("Error fetching user details:", error);
    res.status(500).json({
      message: "Failed to fetch user details",
      error: error.message,
    });
  }
};

const getAllUser = async (req, res) => {
  const currentUserId=req.user.id
  try {
    const names = await userModel.find({ _id: { $ne: currentUserId } });

    return res.status(200).json({ names });
  } catch (error) {
    console.error("Error fetching user data:", error);

   return res.status(500).json({ error: "Internal Server Error" });
  }
};

const logout =  async (req, res) => {
  const email = req.user.email 
  if (!email) {
    return res.status(401).json({ message: "Invalid token" });
  } 
  try {
    const user = await userModel.findOne({ email:email  });
    user.isOnline=false
    await user.save();
    res.clearCookie("jwt", { httpOnly: true });
    return res.status(200).json({ message: "Logged out successfully" });
  
  } catch (error) {
    console.error("Error fetching user data:", error);

   return res.status(500).json({ error: "Internal Server Error" });
  }


};

const selectedUser = async (req, res) => {
  const { Uname } = req.body;
  try {
    const user = await userModel.findOne({ name: Uname });
    if (!user) {
      return res.status(400).json({ message: "User not found" });
    }
    return res.status(200).json({ name: user.name, isOnline: user.isOnline ,id:user._id, profileImage:user.profileImage });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
};






module.exports = { register, verifyOTP, login, dashboard,getAllUser,getUser,logout,selectedUser ,imageUpdate,};
