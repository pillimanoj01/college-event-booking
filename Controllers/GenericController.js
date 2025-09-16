const EventModel = require("../Models/EventModel")

const getAllEvents=async(req,res)=>{
    try {
       const events=await EventModel.find({status:"approved"}).populate(path="createdBy",select="clubName facultyCoordinator");
       res.json({
        events
       }) 
    } catch (error) {
        console.log(error);
        res.status(200).json({
            message:"Something Went Wrong"
        })
    }
}

const getEvent=async(req,res)=>{
    try {
        const {eventId}=req.params;
       const events=await EventModel.findById(eventId).populate(path="createdBy",select="clubName facultyCoordinator");
       res.json({
        events
       }) 
    } catch (error) {
        console.log(error);
        res.status(200).json({
            message:"Something Went Wrong"
        })
    }
}

module.exports= {getAllEvents,getEvent}