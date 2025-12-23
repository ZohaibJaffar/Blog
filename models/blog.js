const {Schema, model}= require("mongoose")


const blogSchema = new Schema({
    title : {
        type: String,
        required : true
    },
    description :{
        type : String,
        required : true
    },
    image :{
        type : String,
        required : false
    },
    createdBy:{
        type : Schema.Types.ObjectId,
        ref : "User"
    }
},{timestamps : true})

const Blog = model("blog",blogSchema)



module.exports = Blog