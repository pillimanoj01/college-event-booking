
const express=require("express")
const {getAllEvents,getEvent} =require("../Controllers/GenericController.js")


const router=express.Router();


router.get("/events",getAllEvents)

router.get("/event/:id",getEvent)




module.exports=router
