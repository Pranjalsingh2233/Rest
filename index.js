const express = require("express");
const app = express();
const path = require("path");
const { v4: uuidv4 } = require('uuid');
const methodOverride = require("method-override");
const port = 8080;

app.use(express.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.set("views", path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));
app.use(methodOverride("_method"));

let posts = [
    {
        id: uuidv4(),
        username: "Riya Pandey",
        image: "images/riya.jpg",
        caption: "Be your own kind of beautiful"
    },
    {
        id: uuidv4(),
        username: "Pranjal Singh",
        image: "../images/pranjal.jpg",
        caption: "Stay cool, stay humble"
    },
    {
        id: uuidv4(),
        username: "Virat Kohli",
        image: "../images/virat.jpg",
        caption: "Kohli on the field = poetry in motion"
    },
];

app.get("/posts", (req, res) => {
    res.render("index.ejs", {posts});
});

app.get("/posts/new", (req, res) => {
    res.render("new.ejs");
});

app.get("/posts/:id", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("see.ejs", {post});  
});

app.post("/posts", (req, res) => {
    let {username, images, caption} = req.body;
    posts.push({username, images, caption});
    res.redirect("http://localhost:8080/posts");
});

app.get("/posts/:id/edit", (req, res) => {
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    res.render("edit.ejs", {post});
});

app.patch("/posts/:id", (req, res) => {
    let {caption} = req.body;
    let {id} = req.params;
    let post = posts.find((p) => p.id === id);
    post.caption = caption;
    res.redirect("http://localhost:8080/posts");
});

app.delete("/posts/:id", (req, res) => {
    let {id} = req.params;
    posts = posts.filter((p) => p.id !== id);
    res.redirect("http://localhost:8080/posts");
});

app.listen(port, () => {
    console.log("Listening");
});