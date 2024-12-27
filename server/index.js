const express = require('express')
const dotenv = require('dotenv')
const dbConnect  = require('./db.js')
const authRoutes = require('./routes/auth.routes.js')
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const http = require("http");
const { Server } = require("socket.io");
dotenv.config()
dbConnect()
const app = express()
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Update with your frontend origin
    methods: ["GET", "POST"],
  },
});
app.use(bodyParser.urlencoded({ extended: true }))
app.use(cookieParser());
app.use(express.json());
app.use(
    cors({
      httpOnly:true,
      origin: "http://localhost:5173",
      credentials: true, 
    })
  );
  

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);
  
    // Join a room for private chat
    socket.on("join-room", ({ userId, roomId }) => {
      socket.join(roomId);
      console.log(`User ${userId} joined room ${roomId}`);
    });
  
    socket.on("disconnect", () => {
      console.log("A user disconnected:", socket.id);
    });
  });

app.use('/auth', authRoutes)


app.listen(process.env.PORT || 3000 , ()=>console.log(`server is running in the port : ${process.env.PORT}`))