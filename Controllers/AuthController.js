const {z,email,json} = require("zod")
const bcrypt=require("bcrypt");
const userModel = require("../Models/userModel");
const jwt = require("jsonwebtoken");
const { id } = require("zod/v4/locales");

const register= async(req,res)=>{
    const {name,email,password,rollno,year,branch,section}=req.body;

    const student =z.object({
        name:z.string(),
        email:z.email().regex(/@vbithyd\.ac\.in$/i, "Email must be from vbithyd.ac.in"),
        password:z.string().min(8, "Password must be at least 8 characters long").max(20, "Password must be no more than 20 characters").regex(/[A-Z]/, "Password must contain at least one uppercase letter").regex(/[a-z]/, "Password must contain at least one lowercase letter").regex(/[0-9]/, "Password must contain at least one number").regex(/[^A-Za-z0-9]/, "Password must contain at least one special character"),
        rollno:z.string().max(10,"Enter a valid email id"),
        year:z.number(),
        branch:z.string(),
        section:z.string()
    });

    const parsedStudent =student.safeParse({
        name:name,
        email:email,
        password:password,
        rollno:rollno,
        year:year,
        branch:branch,
        section:section
    })

    if(parsedStudent.success){
        const hasedPassword = await bcrypt.hash(parsedStudent.data.password,10)
        const newStudent = new userModel({
            name:parsedStudent.data.name,
            email:parsedStudent.data.email,
            password:hasedPassword,
            role:"Student",
            rollNo:parsedStudent.data.rollno,
            year:parsedStudent.data.year,
            branch:parsedStudent.data.branch,
            section:parsedStudent.data.section
        })
        await newStudent.save();
        console.log("new user data saved");
        res.json({
            message:"Student has sucessfuly registered!"
        })
    }
    else{
        res.json({
            message:parsedStudent.error.issues.map(issue=>issue.message)
        })
    }

}

const login=async(req,res)=>{
    const {email,password,role}=req.body;

    const user = await userModel.findOne({
        email:email,
        role:role
    })

    if(!user){
        res.json({
            message:"user doesnt exist"
        })
    }
   
    const checkPassword = await bcrypt.compare(password,user.password);
    console.log(checkPassword);
    if(!checkPassword){
        res.json({
            message:"Incorrect Password ! Enter a valid password"
        })
    }

    const token = await jwt.sign({
        id:user._id,
        role:role
    },process.env.JWT_SECRET)

    res.json({
        token:token,
        message:"sucessfully loged in the user"
    })

}

module.exports= {register,login}