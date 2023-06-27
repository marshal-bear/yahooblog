//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
//const _ = require("loadash");

const homeStartingContent = "    Welcome to Yahoo Blog Official page. You are welcome to post comments and share your opinion";
const aboutContent = " Yahoo Blog is an Information and motivation hub for all ";
const contactContent = " contact us on whatsapp, facebook, instagram and twitter on our official pages.";

const app = express();

let userbase  = [];
let posts = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));




app.get("/", function(req,res){
res.render("home", {start: homeStartingContent , newPosts: posts } );


} );


app.get("/privacy", function(req,res){
  res.render("privacy", {start: homeStartingContent , newPosts: posts }  );
  
  } );

  app.get("/post", function(req,res){
    res.render("post", {start: homeStartingContent , newPosts: posts }  );
    
    } );


  app.get("/terms", function(req,res){
    res.render("terms", {start: homeStartingContent , newPosts: posts } );
    
    } );  


app.get("/contact", function(req,res){
res.render("contact", {con: contactContent } );

} );



app.get("/about", function(req,res){
res.render("about", { abt: aboutContent} );

} );




app.get("/signup", function(req,res){
  res.render("signup");
  
  } );


  app.post("/signup", function(req,res){

    let  user={
      email : req.body.newuser,
      password : req.body.password
 
   }
  userbase.push(user);
 
 res.redirect("/")
 
 } );





app.get("/compose", function(req,res){

res.render("compose");


} );


app.post("/compose", function(req,res){

   let post ={
     title : req.body.newpost,
     body : req.body.inputpost

  }
posts.push(post);

res.redirect("/")

} );

app.get("/posts/:postName", function(req,res){

 let requestedTitle =  _.lowercase( req.params.postName );

posts.forEach(function(post) {
  let storedTitle = _.lowercase( post.title);

if(storedTitle === requestedTitle){
  console.log("match found!");
}else {
  console.log("not a match !");
}

});



});









app.listen(process.env.PORT || 8080 , function() {
  console.log("Server started on port 8080");
});
