
function roleMiddleware(roles){

    return (req,res,next)=>{
        if(!roles.includes(req.role)){
            return res.json({
                message:"You are not authorized"
            })
        }
        next();
    }

}

module.exports=roleMiddleware