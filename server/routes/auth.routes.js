const express = require('express');
const router = express.Router()
const {register,verifyOTP,login,dashboard,getAllUser,getUser,logout,selectedUser,imageUpdate }=require('../controller/User.controller.js')
const authendication= require('../middleware/auth.middleware.js')
const {messageModel} = require('../models/userModel.js')

router.post('/user/register',register)
router.post('/user/verifyOTP',verifyOTP)
router.post('/user/login', login)
router.get('/user/dashboard', dashboard)
router.get('/user/getAllUser',authendication, getAllUser)
router.get('/user/getUser',authendication,getUser)
router.post('/user/logout',authendication,logout)
router.post('/user/selectedUser',selectedUser)
router.post('/user/imageUpdate',authendication,imageUpdate)



router.get(
  "/user/messages/:receiverId/:senderId",
  authendication,
  async (req, res) => {
    const { senderId, receiverId } = req.params;
    
    try {
      const messages = await messageModel
        .find({
          $or: [
            { senderId, receiverId },
            { senderId: receiverId, receiverId: senderId },
          ],
        })
        .sort({ timestamp: 1 }); // Ensure messages are sorted by timestamp (oldest first)

      res.status(200).json({ messages });
      
      
    } catch (error) {
      console.error("Error fetching messages:", error);
      return res.status(500).json({ message: "Server error" });
    }
  }
);






module.exports = router