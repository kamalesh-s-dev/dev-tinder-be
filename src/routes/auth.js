const express = require("express");
const authRouter = express.Router();
const bcrypt = require("bcrypt");
const User = require("../../models/user");
const {validateSignUpData} = require("../utils/validation")
const jwt = require("jsonwebtoken");

authRouter.post("/signup", async (req,res)=>{
    try{
        validateSignUpData(req)

        const {firstName,lastName,emailId,password,age,gender} = req.body

        const passwordHash = await bcrypt.hash(password,10)

        const user = new User({
            firstName,lastName,emailId,password:passwordHash
        })

        await user.save();
        res.send("User Added Successfully")
    }catch(err){
        res.status(400).send(err.message)
        console.log("something went wrong"+ err.message)
    }
})

authRouter.post("/login" , async (req,res)=>{
    try{
        const {emailId ,password} = req.body

        const user = await User.findOne({emailId:emailId})
        console.log(user)

        if(!user){
            throw new Error("Email is not present")
        }

        const isPasswordValid = await bcrypt.compare(password,user.password)

        if(isPasswordValid){
            const token = jwt.sign({id:user._id},"devtinder@233")
            res.cookie("jwttoken",token)
            res.send("Logged In Successfully")
        }else{
            throw new Error("Password invalid")
        }

    }catch(err){
        res.send("Error : " + err.message)
    }
})

authRouter.post("/logout" , async (req,res)=>{
    res.cookie("jwttoken",null , {
        expires : new Date(Date.now())
    });
    res.send("Logged Out Successfully")
})


module.exports = authRouter;