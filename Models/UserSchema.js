const mongoose=require("mongoose");

const UserSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        unique:true,
        required:true
    },
    password:{
        type:String,
        required:true
    },

    role:{
        type:String,
        enum:["Student","Admin","Club"],
        required:true
    },

    //student specific data
    rollNo:{
        type:String,
        required:true
    },
    year:{
        type:Number,
        required:true
    },
    branch:{
        type:String,
        required:true
    },
    section:{
        type:String,
        required:true
    },


    //Admin Specific Data
    designation:{
        type:String,
        required:true
    },

    //Club Specific Data
    clubName:{
        type:String,
        required:true
    },
    facultyCoordinator:{
        type:String,
        required:true
    },


    createdAt:{
        type:Date,
        default:Date.now
    }
})

module.exports=mongoose.model("UserModel",UserSchema);
