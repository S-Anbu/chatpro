const express = require('express')
const dotenv = require('dotenv')
const dbConnect  = require('./db.js')
const authRoutes = require('./routes/auth.routes.js')
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const {messageModel} = require('./models/userModel.js')
dotenv.config()
dbConnect()
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend origin
    credentials: true,
  },
});
app.use(bodyParser.json({ limit: "10mb" })); // For JSON payloads
app.use(bodyParser.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
      httpOnly:true,
      origin: "http://localhost:5173",
      credentials: true, 
    })
  );
  
 // Socket.IO logic
io.on('connection', (socket) => {
  console.log('A user connected:', socket.id);

  // User joins their own room
  socket.on('join', (userId) => {
    socket.join(userId);
    console.log(`User with ID ${userId} joined room ${userId}`);
  });

  // Listen for incoming chat messages
  socket.on('chatMessage', async(msg) => {
    console.log('Message received:', msg);
    const newMessage = new messageModel({
      senderId: msg.senderId,
      receiverId: msg.receiverId,
      message: msg.message,
    });
    await newMessage.save();
    // Send the message to the recipient and back to the sender
    io.to(msg.receiverId).emit('chatMessage', msg); // Send to recipient
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected:', socket.id);
  });
});

app.use('/auth', authRoutes)


server.listen(process.env.PORT || 3000 , ()=>console.log(`server is running in the port : ${process.env.PORT}`))