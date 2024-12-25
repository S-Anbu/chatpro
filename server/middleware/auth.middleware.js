const jwt = require("jsonwebtoken");
const {userModel} = require('../models/userModel.js'); 

const authentication = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res.status(401).json({ message: "Token not provided" });
    }

    const isTokenVerified = jwt.verify(token, process.env.SECRET_KEY);
    if (!isTokenVerified) {
      return res.status(400).json({ message: "Invalid token" });
    }
    const id = isTokenVerified.id;
    
    const user = await userModel.findOne({ _id: id });
    if (!user) {
      return res.status(400).json({ message: "Invalid user" });
    }

    req.user = user; 
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    return res.status(500).json({ message: "Authentication failed", error: error.message });
  }
};

module.exports = authentication;
