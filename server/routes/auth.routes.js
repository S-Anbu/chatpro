const express = require('express');
const router = express.Router()
const {register,verifyOTP,login,dashboard,getAllUser,getUser,logout,selectedUser }=require('../controller/User.controller.js')
const authendication= require('../middleware/auth.middleware.js')

router.post('/user/register',register)
router.post('/user/verifyOTP',verifyOTP)
router.post('/user/login', login)
router.get('/user/dashboard', dashboard)
router.get('/user/getAllUser',authendication, getAllUser)
router.get('/user/getUser',authendication,getUser)
router.post('/user/logout',authendication,logout)
router.post('/user/selectedUser',selectedUser)

module.exports = router