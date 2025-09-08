

const jwt= require("jsonwebtoken")

function userMiddleware(req,res,next){
    const {token}=req.headers;

    const verifiedData = jwt.verify(token,process.env.JWT_SECRET)

    if(verifiedData){
        req.userId=verifiedData.id
        req.role=verifiedData.role
        next();
    }
    else{
        res.json({
            message:"Invalid Authurization"
        })
    }
}

module.exports=userMiddleware;