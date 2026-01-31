const express = require("express");
const profileRouter = express.Router();
const {userAuth} = require("../../middleware/auth")
const {validateProfilEditData} = require("../utils/validation")


profileRouter.post("/profile/view", userAuth ,async(req,res)=>{
    try{
       const user = req.user
       console.log(user)

       if(!user){
        throw new Error("User is missing")
       }

       res.send(user)
    }catch(err){
        res.status(400).send("Error : " + err.message)
        console.log(err)
    }
})


profileRouter.patch("/profile/edit", userAuth, async(req,res)=>{
    try{

        if(!validateProfilEditData(req)){
            throw new Error("Invalid Edit Request")
        }

        const user = req.user

        Object.keys(req.body).forEach((field)=>{
            user[field] = req.body[field]
        })

        console.log(user)

        await user.save()
        res.send("Profile Updated Successfully")

    }catch(err){
        res.status(400).send("Error : " + err.message)
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