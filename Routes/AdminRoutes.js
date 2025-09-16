const express=require("express");
const { route } = require("./AuthRoutes");
const {getApprovedEvents,getPendingEvent,getRejectedEvents,getPendingEvnets,approveEvent,rejectEvent}=require("../Controllers/AdminController.js")
const AuthMiddleware=require("../Middlewares/AuthMiddleware.js")
const roleMiddleware =require("../Middlewares/RoleMiddleware.js")

const router=express.Router();


router.get("/pending-events",AuthMiddleware,roleMiddleware(["Admin"]),getPendingEvnets)

router.get("/pending-events/:eventId",AuthMiddleware,roleMiddleware(["Admin"]),getPendingEvent)

router.post("/approve-event/:eventId",AuthMiddleware,roleMiddleware(["Admin"]),approveEvent)

router.post("/reject-event/:eventId",AuthMiddleware,roleMiddleware(["Admin"]),rejectEvent)

router.get("/approved-events",AuthMiddleware,roleMiddleware(["Admin"]),getApprovedEvents)

router.get("/rejected-events",AuthMiddleware,roleMiddleware(["Admin"]),getRejectedEvents)



module.exports=router