require("dotenv").config()
const express=require("express");
const connectDB=require("./config/db.js")
const AuthRoutes=require("./Routes/AuthRoutes.js")
const StudentRoutes=require("./Routes/StudentRoutes.js")
const ClubRoutes=require("./Routes/ClubRoutes.js")
const AdminRoutes=require("./Routes/AdminRoutes.js")

const app=express();
app.use(express.json())

app.use("/api/auth",AuthRoutes)
app.use("/api/student",StudentRoutes)
app.use("/api/club",ClubRoutes)
app.use("/api/admin",AdminRoutes)






const main = async()=>{
    await connectDB();
    app.listen(process.env.POST,()=>{
    console.log("Sever started !");
})
}

main();


