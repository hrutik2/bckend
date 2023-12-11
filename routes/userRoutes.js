const express=require("express");
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken");
const { userModule } = require("../modules/user_modules");

const userRoutes=express.Router()

userRoutes.post("/register",(req,res)=>{
    const {name,email,password,gender}=req.body
    try {
        bcrypt.hash(password,3, async(err, hash)=> {
          if(err){
            res.status(400).send({"error":err})   
          }
          else{
            const user=new userModule({name,email,gender,password:hash})
            await user.save()
            res.status(200).send({"mag":"user Register successfully"})
          }
        });
    } catch (error) {
     res.status(400).send({"error":error})   
    }
})
userRoutes.post("/login",async(req,res)=>{
    const {email,password}=req.body
   
    try {
       
        const user=await userModule.findOne({email})
        if(user){
            bcrypt.compare(password,user.password,(err,result)=>{
               if(err){
                res.status(400).send({"error":err})
               }
               else{
                var token = jwt.sign({userID:user._id}, "hrutik")
                res.status(200).send({"masg":"login successful", "token":token})
               }
            })
            
        }
    } catch (error) {
     res.status(400).send({"error":error})   
    }
})


module.exports={userRoutes}