const express=require("express")
const {registerEevent,getRegisteredEvent,getRegisteredEvents} =require("../Controllers/StudentController.js")


const router=express.Router();


router.post("/register/:id",registerEevent)

router.get("/registered-events",getRegisteredEvents)

router.get("/registered-events/:id",getRegisteredEvent)




module.exports=router