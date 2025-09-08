const express=require("express")
const {postEvent,updateEvent,deleteEvent,getActiveClubEvents,getActiveClubEvent,getPreviousEvents,getPreviousEvent}=require("../Controllers/ClubController.js")
const AuthMiddleware= require("../Middlewares/AuthMiddleware.js");
const upload = require("../Middlewares/Multer.js")
const roleMiddleware=require("../Middlewares/RoleMiddleware.js")


const router=express.Router();


router.post("/event",AuthMiddleware,roleMiddleware(["Club"]),upload.single("poster"),postEvent)

router.put("/event/:eventId",AuthMiddleware,roleMiddleware(["Club"]),upload.single("poster"),updateEvent)

router.delete("/event/:eventId",AuthMiddleware,roleMiddleware(["Club"]),deleteEvent)

router.get("/events/active",getActiveClubEvents)

router.get("/events/active/:id",getActiveClubEvent)

router.get("/events/previous",getPreviousEvents)

router.get("/events/previous/:id",getPreviousEvent)







module.exports=router