const express=require("express")
const {postEvent,updateEvent,deleteEvent,getActiveClubEvents,getActiveClubEvent,getPreviousEvents,getPreviousEvent}=require("../Controllers/ClubController.js")



const router=express.Router();


router.post("/event",postEvent)

router.put("/event/:id",updateEvent)

router.delete("/evnet/:id",deleteEvent)

router.get("/active-events",getActiveClubEvents)

router.get("/active-events/:id",getActiveClubEvent)

router.get("/previous-events",getPreviousEvents)

router.get("/previous-events/:id",getPreviousEvent)







module.exports=router