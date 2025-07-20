const mongoose = require('mongoose')

const DBUrl = "mongodb+srv://kamaleshsdev:x2xct2bdiGnoTNrq@dev-cluster.dg5dnud.mongodb.net/"

const connectDB = async()=>{
    await mongoose.connect(DBUrl)
}

module.exports = {connectDB}

// connectDB().then(()=>{
//         console.log("db connected")
//     })
//     .catch((err)=>{
//         console.error("db cannot be connected")
//     }) 