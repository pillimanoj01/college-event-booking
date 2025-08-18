const mongoose=require("mongoose");

const connectDB=async()=>{
    await mongoose.connect(process.env.DBURL)
    console.log("DB connected")
}

module.exports=connectDB;