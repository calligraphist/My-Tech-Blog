const router = require('express').Router();
//const {User} = require("../model");

// Send the rendered homepage Handlebars.js template back as the response
router.get("/homepage", (req,res)=>{
    res.render("homepage")
});

// Send the rendered login Handlebars.js template back as the response
router.get("/login", (req,res)=>{
    res.render("login")
});

// Send the rendered dashboard Handlebars.js template back as the response
router.get("/dashboard", (req,res)=>{
    const name ="test";
    res.render("dashboard", { name: name })
});

// Send the rendered blog Handlebars.js template back as the response
router.get("/blog", (req,res)=>{
    res.render("blog")
})

module.exports=router