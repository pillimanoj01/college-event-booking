const mongoose=require("mongoose");


const EventSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true
    },

    description:{
        type:String,
        required:true
    },

    category:{
        type:String,
        required:true,
    },

    registrationFee: {
      type: Number,
      default: 0, // Free by default
    },

    registrationType: {
      type: String,
      enum: ["individual", "team"],
      default: "individual",
    },

    teamSize: {
      type: Number,
      required: function () {
        return this.registrationType === "team";
      },
    },

    date:{
        type:Date,
        required:true
    },

    venue:{
        type:String,
        required:true,
    },

    eventType:{
        type:String,
        enum:["single-day","multi-day"],
        default:"single-day"
    },

    evnetStartDate:{
        type:Date,
        required:function(){
            return this.eventType==="multi-day"
        }
    },

    evnetEndDate:{
        type:Date,
        required:function(){
            return this.eventType==="multi-day"
        }
    },

    startTime:{
        type: Date,
        required: true 
    },

    endTime:{ 
        type: Date,
        required: true 
    },

    status:{
        type:String,
        enum:["pending","approved","rejected"],
        default:"pending",
    },

    createdBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"userModel"
    },

    posterUrl:{
        type:String,
    },
    posterId:{
        type:String
    },

    createdAt:{
        type: Date, default: Date.now 
    }

})


module.exports=mongoose.model("EventModel",EventSchema);

