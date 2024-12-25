const express = require('express')
const dotenv = require('dotenv')
const dbConnect  = require('./db.js')
const authRoutes = require('./routes/auth.routes.js')
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");

dotenv.config()
dbConnect()
const app = express()

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
  

app.use('/auth', authRoutes)


app.listen(process.env.PORT || 3000 , ()=>console.log(`server is running in the port : ${process.env.PORT}`))