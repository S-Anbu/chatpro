const express = require('express')
const dotenv = require('dotenv')
const dbConnect  = require('./db.js')
const authRoutes = require('./routes/auth.routes.js')
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
const {messageModel,groupModel} = require('./models/userModel.js')
dotenv.config()
dbConnect()
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://chatpro-client.onrender.com", // Update with your frontend origin
    // origin: "http://http://localhost:5173", // Update with your frontend origin
    methods: ["GET", "POST"],
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
      origin: "https://chatpro-client.onrender.com",
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



///////




// // Group chat functionality
// io.on("connection", (socket) => {
//   console.log("A user connected for group chat:", socket.id);

//   // User joins a group
//   socket.on("joinGroup", (groupName) => {
//     socket.join(groupName);
//     console.log(`User with ID ${socket.id} joined group ${groupName}`);
//   });

//   // Handle group message sending
//   socket.on("sendGroupMessage", async (data) => {
//     const { groupName, message, senderId } = data;

//     // Save the group message to the database
//     const group = await groupModel.findOne({ name: groupName });
//     if (!group) {
//       console.error(`Group ${groupName} not found.`);
//       return;
//     }

//     const newMessage = new messageModel({
//       senderId: senderId,
//       groupId: group._id,
//       message: message,
//     });
//     await newMessage.save();

//     // Broadcast the message to the group
//     io.to(groupName).emit("receiveGroupMessage", {
//       senderId,
//       message,
//       groupName,
//     });

//     console.log(`Message sent to group "${groupName}":`, message);
//   });

//   socket.on("disconnect", () => {
//     console.log("A user disconnected from group chat:", socket.id);
//   });
// });





app.use('/auth', authRoutes)


server.listen(process.env.PORT || 3000 , ()=>console.log(`server is running in the port : ${process.env.PORT}`))
