const express=require("express")
const { postModule } = require("../modules/post_model")
const { userModule } = require("../modules/user_modules")
const { Auth } = require("../middleware/Auth")

const postRoutes=express.Router()

postRoutes.post("/add",Auth,async(req,res)=>{
    
    try {
        const post=new postModule(req.body)
        await post.save()
        res.status(200).send({"massage":"post created"})
        
    } catch (error) {
     res.status(400).send({"error":error})   
    }
})
postRoutes.get("/",Auth,async(req,res)=>{
      const userID=req.body
      console.log(userID)
    try {
        const posts=await postModule.find(req.body,req.query)
        res.status(200).send(posts)
    } catch (error) {
     res.status(400).send({"error":error})   
    }
})
postRoutes.patch("/update/:id",Auth,async(req,res)=>{
      const{id}=req.params
    try {
        const user=await postModule.findById({_id:id})
        if(user){
        await postModule.findByIdAndUpdate({_id:id})
        
        res.status(200).send({"massage":"post updated"},req.body)
        }
        else{
           res.status(400).send({"error":"error"})    
        }
    } catch (error) {
     res.status(400).send({"error":error})   
    }
})
postRoutes.delete("/delete/:id",Auth,async(req,res)=>{
    const{id}=req.params
    try {
        const user=await postModule.findById({_id:id})
        if(user){
        await postModule.findByIdAndDelete({_id:id})
        res.status(200).send({"massage":"post Deleted"})
        }
        else{
           res.status(400).send({"error":"error"})    
        }
        
    } catch (error) {
     res.status(400).send({"error":error})   
    }
})

module.exports={postRoutes}
