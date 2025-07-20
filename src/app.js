const express = require("express");
const {adminAuth} = require('../middleware/auth')

const {connectDB} = require("../config/database")

const app = express()

connectDB().then(()=>{
        console.log("db connected")
        
app.listen(3000 , ()=>{
    console.log("server is running successfully")
})
    })
    .catch((err)=>{
        console.error("db cannot be connected")
    }) 




