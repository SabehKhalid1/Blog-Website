//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");

const _ = require("lodash");

var homeStartingContent = "Steps to post your own blog!\n" +

"1. In the browser go to the type /compose and press enter to go to the compose page\n" +
" 2. Give your blog post a title and begin writing your content in the text editor provided.\n" +
" 3. When you are finished, click on the Publish button to make your post live on the blog.\n" +
" 4. Once your post is published, it will be visible on the Home page.\n";



const aboutContent = "Welcome to my blog! This is a platform where anyone can share their thoughts, experiences, and ideas with the world. It covers a wide range of topics, including but not limited to: personal development, creative expression, mental health, sustainability, and current events. I believe that through open and honest communication, we can inspire and support one another to live more meaningful and fulfilling lives. I encourage others to join in and post their own blogs here as well. I hope you enjoy reading my articles and the contributions of others, and I look forward to connecting with you.";
const contactContent = "Thank you for visiting my blog! I would love to hear from you and welcome any questions, comments, or feedback you may have. You can reach us by sending us an email at blogDaily@gmail.com. We strive to respond to all inquiries within 48 hours. We value your input and appreciate the opportunity to connect with you. Thank you for your support and we look forward to hearing from you!";

const app = express();

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let posts = [];

app.get("/", function(req,res){
  res.render("home", {
    homeContent : homeStartingContent,
    postContent : posts

  });
    
    
});

app.get("/about", function(req,res){
  res.render("about", {
    aboutInfo : aboutContent

  });
});

app.get("/contact", function(req,res){
  res.render("contact", {
    contactInfo : contactContent

  });

  re
});

app.get("/compose", function(req,res){
  res.render("compose");
  

});

app.get("/posts/:postName", function(req,res){
  const requestedTitle = req.params.postName;


  posts.forEach(function(post){
    var storedTitle = post.title;

    if(_.lowerCase(storedTitle) === _.lowerCase(requestedTitle)) {
      res.render("post", {
        title : post.title,
        content : post.content
    
      });
    }
  });

  
  
});



app.post("/compose", function(req, res){ 
  const post = {
  title : req.body.postTitle,
  content : req.body.postBody
  };
  
  posts.push(post);

  res.redirect("/");

  

});







app.listen(3000, function() {
  console.log("Server started on port 3000");
});
