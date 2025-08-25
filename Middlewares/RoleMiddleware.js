
function roleMiddleware(roles){

    return (req,res,next)=>{
        if(!roles.includes(res.user.role)){
            return res.json({
                message:"You are not authorized"
            })
        }
        next();
    }

}