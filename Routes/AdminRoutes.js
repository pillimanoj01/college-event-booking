const express=require("express");
const { route } = require("./AuthRoutes");
const {getApprovedEvents,getPendingEvent,getRejectedEvents,getPendingEvnets,approveEvent,rejectEvent}=require("../Controllers/AdminController.js")


const router=express.Router();


router.get("/pending-events",getPendingEvnets)

router.get("/pending-events/:id",getPendingEvent)

router.post("/approve-event/:id",approveEvent)

router.post("/reject-event/:id",rejectEvent)

router.get("/approved-events",getApprovedEvents)

router.get("/rejected-events",getRejectedEvents)



module.exports=router