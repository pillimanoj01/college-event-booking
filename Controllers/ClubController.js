const cloudinary=require("../config/cloudinary")
const Event = require("../Models/EventModel")
const User=require("../Models/userModel")



const postEvent=async(req,res)=>{
     console.log("route hitted");
    try{
        const { title, description, registrationFee,category,registrationType,date, venue,eventType,startTime,endTime} = req.body;
        if(registrationType==="team"){
            const {teamSize}=req.body;
        }
        if(eventType==="multi-day"){
            const {evnetStartDate,evnetEndDate}=req.body;
        }


        // File comes from multer
        if (!req.file) {
        return res.status(400).json({ error: "Poster image is required" });
        }

        // Upload to Cloudinary (using buffer stream)
        const result = await new Promise((resolve, reject) => {
        const stream = cloudinary.uploader.upload_stream(
            { folder: "event_posters" },
            (error, result) => {
            if (error) reject(error);
            else resolve(result);
            }
        );
        stream.end(req.file.buffer);
        });

        const club=User.findOne({_id:req.userId});
        const newEvent = new Event({
            title:title,
            description:description,
            category:category,
            registrationFee:registrationFee,
            registrationType:registrationType,
            date:date,
            venue:venue,
            eventType:eventType,
            startTime:new Date(startTime),
            endTime:new Date(endTime),
            status:"pending",
            createdBy:club.clubName,
            posterUrl:result.secure_url,

        })
        if(registrationType==="team"){
            newEvent.teamSize=teamSize;
        }
        if(eventType==="multi-day"){
            newEvent.evnetStartDate=evnetStartDate
            newEvent.evnetEndDate=evnetEndDate
        }
        await newEvent.save();

        res.status(201).json({ message: "Event created successfully", event: newEvent });
    }
    catch (error) {
    console.error(error);
    res.status(500).json({ error: "Something went wrong" });
  }

}

const updateEvent=(req,res)=>{
    

}

const deleteEvent=(req,res)=>{

}

const getActiveClubEvents=(req,res)=>{

}

const getActiveClubEvent=(req,res)=>{

}

const getPreviousEvents=(req,res)=>{

}

const getPreviousEvent=(req,res)=>{

}

module.exports= {postEvent,updateEvent,deleteEvent,getActiveClubEvents,getActiveClubEvent,getPreviousEvents,getPreviousEvent}

