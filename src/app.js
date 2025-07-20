const express = require("express");
const {adminAuth} = require('../middleware/auth')

const app = express()

app.use('/admin' , adminAuth)

app.get('/admin/getData',(req,res,next)=>{
    console.log("admin auttentoication success")
    res.send("admin authentication success")
})



app.use('/user',
    (res,req,next)=>{
        console.log("1st user")
        next()
},(req,res,next)=>{
    console.log("2nd user")
    next()
},(req,res,next)=>{
    console.log("3rd user")
    res.send("3rd user")
}
)


app.listen(3000 , ()=>{
    console.log("server is running successfully")
})

