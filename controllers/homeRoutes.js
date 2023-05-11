const router = require('express').Router();
const {User} = require("../model");

router.get("/", (req,res)=>{
    res.render("homepage")
});

router.get("/", (req,res)=>{
    res.render("login")
});

router.get("/", (req,res)=>{
    res.render("dashboard")
});

router.get("/", (req,res)=>{
    res.render("blog")
})

module.exports=router