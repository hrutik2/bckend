const mongoose=require("mongoose")

const Connection=mongoose.connect("mongodb+srv://hrutik0729:hrutik@cluster0.9kopobq.mongodb.net/evl?retryWrites=true&w=majority")

module.exports={Connection}