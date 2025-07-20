const adminAuth = (req,res,next)=>{
    const token ="xyz"
    const adminToken = "xyz" === token

    if(!adminToken){
        console.log("token not valid")
        res.status(401).send("token not valid")
    }else{
         console.log("token valid")
         next();
    }
}

module.exports={adminAuth}