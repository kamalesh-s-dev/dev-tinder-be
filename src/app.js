const express = require("express");

const app = express()

app.use('/home',(req,res) =>{
    res.send("server is running on 3000 port")
})

app.use('/user',(req,res) =>{
    res.send("user data")
})

app.listen(3000 , ()=>{
    console.log("server is running successfully")
})

