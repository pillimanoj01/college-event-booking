const mongoose=require("mongoose");
const { required } = require("zod/mini");
const objectID=mongoose.Schema.Types.ObjectId;


const RegistrationSchema= new mongoose.Schema({
   student:{
    type:objectID,
    ref:"userModel"
   },

   event:{
    type:objectID,
    ref:"EventModel",
    required:true,
   },

   team:{
      teamName:{
         type:String,
      },
      teamLeader:{
         type:objectID,
         ref:"userModel"
      },
      teamMembers:[
         {
         type:objectID,
         ref:"userModel"
         },
      ]
   },

   registeredAt:{
    type:Date,
    default:Date.now
   }
})

module.exports=mongoose.model("RegistrationModel",RegistrationSchema)