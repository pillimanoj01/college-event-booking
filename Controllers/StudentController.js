const EventModel = require("../Models/EventModel");
const RegistrationModel = require("../Models/RegistrationModel");
const User = require("../Models/userModel")

const registerEvent=async(req,res)=>{
    const {eventId}=req.params;

    const event= await EventModel.findById(eventId)

    if(!event){
        res.status(404).json("No Event Found!");
    }

    if(event.registrationType==="individual"){
        const Registration = RegistrationModel.findOne({student:req.userId,event:event._id});
        if(Registration){
            res.status(404).json({
                message:"Already Registered!"
            })
        }
        const newRegistration= new RegistrationModel({
            student:req.userId,
            event:event._id,
        });
        await newRegistration.save()
        res.status(200).json({
            message:"Sucessfully registered for the event"
        })  
    }
    else if(event.registrationType==="team"){
        const {teamName,teamLeader,teamMembers}=req.body;
        console.log(teamLeader)

        const teamLeaderData= await User.findOne({rollNo:teamLeader});
        console.log(teamLeaderData)

        if(!teamLeaderData){
            res.json({
                message:"Team Leader must be there for registering"
            })
        }

        const newTeam = new RegistrationModel({
            event:event._id,
        })
        console.log(teamLeaderData._id);
        const team={
            teamName:teamName,
            teamLeader:teamLeaderData._id
        }

        if(event.teamSize!==teamMembers.length+1){
            res.status(404).json({
                message:`Invalid Team Size`
            })
        }
        console.log("recahed")
        const teamIds =[]
       for(i=0;i<teamMembers.length;i++){
            const member=await User.findOne({rollNo:teamMembers[i]})
            if(!member){
                res.json({
                    message:`Invalid team member ${i+1} rollno`
                })
            }
            teamIds.push(member._id);
       }
       team.teamMembers=teamIds;
       newTeam.team=team;
       newTeam.save()
       res.status(200).json({
        message: "Sucessfully Registered the team",
        newTeam
       })

    }
}

const getRegisteredEvents=async(req,res)=>{
    const userId=req.userId;
    const registrations = await RegistrationModel.find({
        $or:[
            {student:userId},
            {"team.teamLeader":userId},
            {"team.teamMembers":userId}
        ],
    }).populate("event")


    if(registrations){
        res.status(200).json({
            registrations
        })
    }
    else{
        res.json(404).json({
            message:"No Registartion Found"
        })
    }
}

const getRegisteredEvent=(req,res)=>{

}

module.exports= {registerEvent,getRegisteredEvent,getRegisteredEvents}