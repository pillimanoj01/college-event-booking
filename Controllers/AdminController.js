const EventModel = require("../Models/EventModel");

const getPendingEvnets=async(req,res)=>{
    try {
        const events=await EventModel.find({status:"pending"})
        res.status(200).json({
            events
        })
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}



const getPendingEvent=async(req,res)=>{
    try {
        const {eventId}=req.params;
        const event= await EventModel.findById(eventId).populate(path="createdBy",select="clubName facultyCoordinator");
        res.status(200).json({
            event
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

const getApprovedEvents=async(req,res)=>{
    try {
        const events=await EventModel.find({status:"approved"})
        res.status(200).json({
            events
        })
    } catch (error) {
        
    }
}

const getRejectedEvents=async(req,res)=>{
     try {
        const events=await EventModel.find({status:"rejected"})
        res.status(200).json({
            events
        })
    } catch (error) {
        
    }
}

const approveEvent=async(req,res)=>{
    try {
        const {eventId}=req.params;
        const updatedEvent = await EventModel.findByIdAndUpdate({_id:eventId},{$set:{status:"approved"}},{new:true})
        res.status(200).json({
            updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

const rejectEvent=async(req,res)=>{
     try {
        const {eventId}=req.params;
        const updatedEvent = await EventModel.findByIdAndUpdate({_id:eventId},{$set:{status:"rejected"}},{new:true})
        res.status(200).json({
            updatedEvent
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            message:"Something went wrong"
        })
    }
}

module.exports= {getApprovedEvents,getPendingEvent,getRejectedEvents,getPendingEvnets,approveEvent,rejectEvent}