 const jwt=require("jsonwebtoken")
 const Auth=(req,res,next)=>{
    const token=req.headers.authorization?.split(" ")[1]
    try {
        jwt.verify(token, "hrutik",(err, decoded)=> {
            if(err){
                 res.status(400).json({msg:"Auth failed"})
            }
            else{
                console.log(decoded)
                req.body.userID=decoded.userID
                next()
            }
          })
    } catch (error) {
        res.send(error)
    }
}
module.exports={Auth}