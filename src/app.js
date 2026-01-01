const express = require("express");
const {adminAuth} = require('../middleware/auth')
const {connectDB} = require("../config/database")
const {validateSignUpData} = require("./utils/validation")
const bcrypt = require("bcrypt")
const cookieParser = require("cookie-parser");
const jwt = require("jsonwebtoken");

const User = require("../models/user")

const app = express()
app.use(express.json());
app.use(cookieParser())

app.post("/signup", async (req,res)=>{
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

app.post("/login" , async (req,res)=>{
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

app.post("/profile", async(req,res)=>{
    try{
       const token = req.cookies.jwttoken;

       const decodeToken = jwt.verify(token , "devtinder@233")
        console.log(decodeToken)

        const getUser = await User.findById(decodeToken.id).select("-password")
        console.log(getUser)

        if(!getUser){
            console.log("user not found")
        }else{
            console.log("user found")
            res.send(getUser)
        }

    }catch(err){
        console.log(err)
    }
})

app.get("/getAllUsers", async (req,res)=>{
    try{
        const users = await User.find()
        res.send(users)
    }catch(err){
        res.send(err.message)
    }
})

app.get("/getUserById" , async (req,res)=>{
    try{
        const user = await User.findById(req.body.id)
        res.send(user)
    }catch(err){
        res.send(err.message)
    }
})

app.patch("/updateUser/:id" , async(req,res)=>{
    try{
        const user = await User.findByIdAndUpdate(req.params.id,req.body)
        res.send("successfully edited")
    }catch(err){
        res.send(err.message)
    }
})


connectDB().then(()=>{
        console.log("db connected")
        
app.listen(3000 , ()=>{
    console.log("server is running successfully")
})
    })
    .catch((err)=>{
        console.error("db cannot be connected",err)
    }) 




