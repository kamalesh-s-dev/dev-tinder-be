const express = require("express");
const {adminAuth} = require('../middleware/auth')
const {connectDB} = require("../config/database")
const cookieParser = require("cookie-parser");

const app = express()
app.use(express.json());
app.use(cookieParser())

const authRouter = require("./routes/auth")
const profileRouter = require("./routes/profile")
const requestRouter = require("./routes/request")

app.use("/", authRouter);
app.use("/", profileRouter);
app.use("/", requestRouter);


connectDB().then(()=>{
        console.log("db connected")
        
app.listen(3000 , ()=>{
    console.log("server is running successfully")
})
    })
    .catch((err)=>{
        console.error("db cannot be connected",err)
    }) 




