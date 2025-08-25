const mongoose=require("mongoose");
const objectID=mongoose.Schema.Types.ObjectId;


const RegistrationSchema= new mongoose.Schema({
   student:{
    type:objectID,
    ref:"StudentModel"
   },
   event:{
    type:objectID,
    ref:"EventModel"
   },
   registeredAt:{
    type:Date,
    default:Date.now
   }
})

