const mongoose = require('mongoose')

const DBUrl = "mongodb+srv://kamaleshsdev:x2xct2bdiGnoTNrq@dev-cluster.dg5dnud.mongodb.net/test"

const connectDB = async()=>{
    await mongoose.connect(DBUrl)
}

module.exports = {connectDB}