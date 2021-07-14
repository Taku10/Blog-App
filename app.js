const express = require("express");
const app = express();
const ejsMate= require("ejs-mate");
const methodOverride = require("method-override");
const path = require("path");
const Blog = require("./models/blog")
const Comment = require("./models/comment")

//database config
const mongoose = require("mongoose");
const { findById } = require("./models/blog");
// const blogDB = 'mongodb://localhost:27017/blog-db'

mongoose.connect('mongodb://localhost:27017/blog-db', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () =>{
    console.log("Database connected");
});


//App config
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.urlencoded({extended: true}));
app.use(methodOverride("_method"));
app.engine("ejs", ejsMate);


const categories = ["Sports", "Nature", "Cars", "Tech", "Medicine", "Fashion", "Gaming", "General News", "Fitness", "Travel", "Other"];


//home page 
app.get("/", (req, res)=>{
    res.render("landing")
})



//list of all blogs
app.get("/blog",async(req, res)=>{
    const blogs = await Blog.find({})

    res.render("blog/index", {blogs})
})



//render new form
app.get("/blog/new", (req, res)=>{
    res.render("blog/new", {categories})
})




//post route
app.post("/blog", async(req, res)=>{
    const blogs = await new Blog(req.body.blog)
    await blogs.save();
    res.redirect("/blog")
})

//read more page
app.get("/blog/:id", async(req, res)=>{
    const {id} = req.params
    const blogs = await Blog.findById(id).populate({path:"comment", populate: {path: "author"}}).populate("author")
    res.render("blog/show", {blogs})
})


//render edit route
app.get("/blog/:id/edit", async(req, res)=>{
    const {id} = req.params
    const blogs = await Blog.findById(id)
    res.render("blog/edit", {blogs, categories})
})


//update route
app.put("/blog/:id", async(req, res)=>{
    const {id} = req.params
    const body = req.body.blog
    const blogs = await Blog.findByIdAndUpdate(id, {...body}, {runValidators: true, new : true})
    res.redirect(`/blog/${id}`)
})


//delete route
app.delete("/blog/:id", async(req, res)=>{
    const {id} = req.params
    const blogs = await Blog.findByIdAndDelete(id)
    res.redirect("/blog")
})

//Comment routes

//display 
// app.get("/blog/:id/comment", async(req, res)=>{
//     const {id} = req.params
//     const comment = await Comment.findById(id)
//     res.redirect(`/blog/${id}`)
// })

app.post("/blog/:id/comment", async(req, res)=>{
    const {id} = req.params
    const blog = await Blog.findById(id)
    const comment = new Comment(req.body.comment)
    blog.comment.push(comment)
    console.log(comment)
    await blog.save();
    await comment.save();
    res.redirect(`/blog/${id}`)
})

app.delete("/blog/:id/comment/:comId", async(req, res)=>{
    const {id, comId} = req.params;
    await Blog.findByIdAndUpdate(id, {$pull: {comment: comId}})
    const comment = await Comment.findByIdAndDelete(comId)
    res.redirect(`/blog/${id}`)
})


app.listen(3000, function(){
    console.log("Server has Started")
})

