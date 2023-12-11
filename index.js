const express=require("express")
const { userRoutes } = require("./routes/userRoutes")
const { postRoutes } = require("./routes/postRoutes")
const { Connection } = require("./db")
const cors=require("cors")
const app=express()
app.use(express.json())
app.use(cors())
app.use("/users", userRoutes)
app.use("/posts",postRoutes)


app.listen(3330,async()=>{
    try {
        await Connection 
        console.log("server is running")
    } catch (error) {
        console.log(error)
    }
})