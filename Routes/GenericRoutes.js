
const express=require("express")
const {getAllEvents,getEvent} =require("../Controllers/GenericController.js")
const AuthMiddleware=require("../Middlewares/AuthMiddleware.js")

const router=express.Router();


router.get("/events",AuthMiddleware,getAllEvents)

router.get("/event/:eventId",AuthMiddleware,getEvent)




module.exports=router
