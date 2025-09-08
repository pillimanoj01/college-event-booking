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

        const club= await User.findById(req.userId);
        console.log(club)
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
            createdBy:club._id,
            posterUrl:result.secure_url,
            posterId:result.public_id
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

const updateEvent=async(req,res)=>{
        try{
            const {eventId}=req.params;
            const { title, description, registrationFee,category,registrationType,date, venue,eventType,startTime,endTime,teamSize,evnetStartDate,evnetEndDate} = req.body;

            const event = await Event.findById(eventId);
            
            if(!event){
                return res.status(404).json({Error:"Event not found"});
            }

            const user = await User.findById(req.userId);

            if(!event.createdBy.equals(user._id)){
                console.log(event.createdBy);
                console.log(user._id);
                return res.status(403).json({ error: "Not authorized to update this event" });

            }

            if (req.file) {
            if (event.posterId) {
            await cloudinary.uploader.destroy(event.posterId);
            }
        }

            if(req.file){
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
            event.posterUrl = result.secure_url;
            event.posterId = result.public_id;
            }



            if (title) event.title = title;
            if (description) event.description = description;
            if (registrationFee) event.registrationFee = registrationFee;
            if (registrationType) event.registrationType = registrationType;
            if (date) event.date = date;
            if (venue) event.venue = venue;
            if (eventType) event.eventType = eventType;
            if (startTime) event.startTime = startTime;
            if (endTime) event.endTime = endTime;

            if (registrationType === "team" && teamSize) {
                event.teamSize = teamSize;
            }

            if (eventType === "multi-day" && eventStartDate && eventEndDate) {
                event.evnetEndDate = evnetStartDate;
                event.evnetEndDate = evnetEndDate;
            }

            await event.save();
            res.json({
                message:"Event updated"
            })
        }
        catch(error){
            console.log(error);
            res.status(500).json({
                Error:"Something went wrong"
            })
        }
}

const deleteEvent=async(req,res)=>{
    try {
        const {eventId}=req.params;

        const user = await User.findById(req.userId);

        const event = await Event.findById(eventId)

        if(!event.createdBy.equals(user._id)){
                console.log(event.createdBy);
                console.log(user._id);
                return res.status(403).json({ error: "Not authorized to update this event" });

        }

         if (event.posterId) {
            await cloudinary.uploader.destroy(event.posterId);
            }

        const deletedEvent = await Event.findByIdAndDelete(eventId);
        
        if(deletedEvent){
            res.status(201).json({
                message:"Deleted the event"
            })
        }
        else{
           return res.status(404).json({Error:"Event not found"});  
        }
           
    } catch (error) {
        console.log(error)
        res.status(500).json({
                Error:"Something went wrong"
            })
    }
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

