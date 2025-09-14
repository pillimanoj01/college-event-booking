const express=require("express")
const {registerEvent,getRegisteredEvent,getRegisteredEvents} =require("../Controllers/StudentController.js")
const Authurization=require("../Middlewares/AuthMiddleware.js")
const RoleAuthurization=require("../Middlewares/RoleMiddleware.js")

const router=express.Router();


router.post("/register/:eventId",Authurization,RoleAuthurization(["Student"]),registerEvent)

router.get("/registered-events",Authurization,RoleAuthurization(["Student"]),getRegisteredEvents)

router.get("/registered-events/:id",getRegisteredEvent)




module.exports=router