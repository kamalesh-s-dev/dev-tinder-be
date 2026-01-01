const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../../middleware/auth")


profileRouter.post("/profile", userAuth ,async(req,res)=>{
    try{
       const user = req.user

       if(!user){
        throw new Error("User is missing")
       }

       res.send(user)
    }catch(err){
        console.log(err)
    }
})

profileRouter.get("/getAllUsers", async (req,res)=>{
    try{
        const users = await User.find()
        res.send(users)
    }catch(err){
        res.send(err.message)
    }
})

profileRouter.get("/getUserById" , async (req,res)=>{
    try{
        const user = await User.findById(req.body.id)
        res.send(user)
    }catch(err){
        res.send(err.message)
    }
})

profileRouter.patch("/updateUser/:id" , async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.send("successfully edited")
    }catch(err){
        res.send(err.message)
    }
})

module.exports = profileRouter;