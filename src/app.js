const express = require("express");

const app = express()


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

