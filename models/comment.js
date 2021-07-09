const mongoose = require("mongoose")
const Schema = mongoose.Schema;

const commentSchema = new Schema({
    text: {
        type: String,
        require: true
    }
})

const Comment = mongoose.model("Comment", commentSchema)

module.exports = Comment;