const mongoose = require("mongoose");
const Blog = require("../models/blog")

mongoose.connect('mongodb://localhost:27017/blog-db', {useNewUrlParser: true, useUnifiedTopology: true, useFindAndModify: false});
mongoose.set('useCreateIndex', true);

const db = mongoose.connection
db.on("error", console.error.bind(console, "connection error"));
db.once("open", () =>{
    console.log("Database connected");
});



const insertBlogs = ()=>{
    const testBlogs = Blog.insertMany([
        {title: "Day in Cape Town", body: "loremVoluptate dolor irure cillum est Lorem ea. Qui adipisicing excepteur incididunt commodo commodo id nostrud irure adipisicing elit laboris magna aute ea. Ex nisi ex est proident adipisicing in esse sit commodo cillum officia.", category: "Travel"},
        {title: "Euros Cup 2020", body: "loremVoluptate dolor irure cillum est Lorem ea. Qui adipisicing excepteur incididunt commodo commodo id nostrud irure adipisicing elit laboris magna aute ea. Ex nisi ex est proident adipisicing in esse sit commodo cillum officia.", category: "Sports"},
        {title: "Planting 100 trees", body: "loremVoluptate dolor irure cillum est Lorem ea. Qui adipisicing excepteur incididunt commodo commodo id nostrud irure adipisicing elit laboris magna aute ea. Ex nisi ex est proident adipisicing in esse sit commodo cillum officia.", category: "Nature"},
        {title: "Space x and Tesla", body: "loremVoluptate dolor irure cillum est Lorem ea. Qui adipisicing excepteur incididunt commodo commodo id nostrud irure adipisicing elit laboris magna aute ea. Ex nisi ex est proident adipisicing in esse sit commodo cillum officia.", category: "Tech"}
    ])
}

// insertBlogs();