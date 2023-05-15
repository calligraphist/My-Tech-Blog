const router = require('express').Router();
const {User, Blog, Comment} = require("../models");

// Send the rendered homepage Handlebars.js template back as the response
router.get("/", async(req,res)=>{
    try {
        const blogData = await Blog.findAll({include:[{model: User, attributes:["name", "id"]}, {model:Comment, include:[User]}]})
        const blogs = blogData.map((blog)=>blog.get({plain:true}))
        res.render("homepage", {blogs, logged_in:req.session.logged_in})
        
    } catch (error) {
        res.error(error)
    }
});

// Send the rendered login Handlebars.js template back as the response
router.get("/login", (req,res)=>{
    if(req.session.logged_in){
        res.redirect("/dashboard")
    }
    res.render("login")
});

// Send the rendered dashboard Handlebars.js template back as the response
router.get("/dashboard", (req,res)=>{
    
    res.render("dashboard", { name:req.session.username, logged_in:req.session.logged_in })
});

// Send the rendered blog Handlebars.js template back as the response
router.get("/blog", (req,res)=>{
    res.render("blog")
})

module.exports=router