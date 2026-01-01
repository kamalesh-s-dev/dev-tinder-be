const jwt = require("jsonwebtoken");
const User = require("../models/user")

const userAuth = async(req,res,next) =>{
 const token = req.cookies.jwttoken;

 if(!token){
    throw new Error("Token is invalid");
 }

       const decodeToken = jwt.verify(token , "devtinder@233")
        console.log(decodeToken)

        const getUser = await User.findById(decodeToken.id).select("-password")
        console.log(getUser)

        if(!getUser){
            console.log("user not found")
        }

        req.user = getUser;
        next()
}

module.exports={userAuth}