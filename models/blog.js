const mongoose = require("mongoose")
const Schema = mongoose.Schema
const User = require("./user")
const Comment = require("./comment")




const blogSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body :{
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true,
        enum: ["Sports", "Nature", "Cars", "Tech", "Medicine", "Fashion", "Gaming", "General News", "Fitness", "Travel", "Other"]
    },
    authour: {
        type: Schema.Types.ObjectId,
        ref: "User"
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: "Comment"
    }]
})

blogSchema.post("findOneAndDelete", async function(doc){
    if(doc){
        await Comment.deleteMany({
            _id: {
                $in: doc.comment
            }
        })              
    }
})

const Blog = mongoose.model("Blog", blogSchema)

module.exports = Blog;