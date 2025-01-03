import React, { useState, useEffect } from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom"

const EditProfile = () => {
  const [profileImage, setProfileImage] = useState("");
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
const navigate =useNavigate()
  // Fetch user data
  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const res = await axios.get(`${import.meta.env.VITE_API_BASE_URL}/auth/user/getUser`, {
          withCredentials: true,
        });
        setProfileImage(res.data.profileImage);
        setUserName(res.data.name);
        setEmail(res.data.email);
      } catch (err) {
        console.error(`Error fetching user data: ${err}`);
      }
    };

    fetchUserData();
  }, []);

  // Handle image change
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => setProfileImage(reader.result); // Set Base64 image for preview
      reader.readAsDataURL(file);
    }
  };

  // Save profile image to backend
  const handleSave = async () => {
    const file = document.getElementById("profileImage").files[0];
    if (!file) {
      alert("Please upload an image.");
      return;
    }

    // Convert the image to Base64
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = async () => {
      const base64Image = reader.result;

      try {
        const response = await axios.post(
          `${import.meta.env.VITE_API_BASE_URL}/auth/user/imageUpdate`,
          { profileImage: base64Image },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials:true,
          },
    
        );

        alert(response.data.message);
        setProfileImage(response.data.profileImageUrl); // Update profile image in UI
      } catch (error) {
        console.error("Error updating profile image:", error);
        alert("Failed to update profile image.");
      }
    };
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-md">
        <div className=" flex justify-between items-center mb-4">
        <h1 className="text-xl font-semibold text-gray-800  ">Edit Profile</h1>
        <button onClick={()=>navigate('/chatboard')} className="hover:scale-125 p-0 ">
        <svg  className="font-bold" xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="1.5" d="M19 5L5 19M5 5l14 14" color="currentColor"/></svg>
        </button>
        </div>

        <div className="flex flex-col items-center">
          <div className="relative w-24 h-24 mb-4">
            <img
              src={profileImage || `https://ui-avatars.com/api/?name=${userName}&length=1`}
              alt="Profile"
              className="w-full h-full rounded-full object-cover border border-gray-300"
            />
            <label
              htmlFor="profileImage"
              className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600"
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="15" height="15" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M14 22v-3.075l5.525-5.5q.225-.225.5-.325t.55-.1q.3 0 .575.113t.5.337l.925.925q.2.225.313.5t.112.55t-.1.563t-.325.512l-5.5 5.5zm7.5-6.575l-.925-.925zm-6 5.075h.95l3.025-3.05l-.45-.475l-.475-.45l-3.05 3.025zM6 22q-.825 0-1.412-.587T4 20V4q0-.825.588-1.412T6 2h8l6 6v3h-2V9h-5V4H6v16h6v2zm13.025-5.025l-.475-.45l.925.925z"
                />
              </svg>
            </label>
            <input
              id="profileImage"
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </div>

          <div className="w-full text-center mb-4">
            <h2 className="text-lg font-medium text-gray-800">{userName}</h2>
            <p className="text-sm text-gray-600">{email}</p>
          </div>

          <button
            onClick={handleSave}
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default EditProfile;
