const router = require('express').Router();
const {User, Blog, Comment} = require("../models");
const withAuth = require('../utils/auth');

// Send the rendered homepage Handlebars.js template back as the response
router.get("/", async(req,res)=>{
    console.log("test")
    try {
        const blogData = await Blog.findAll({include:[{model: User, attributes:["name", "id"]}, {model:Comment, include:[User]}]})//
        const blogs = blogData.map((blog)=>blog.get({plain:true}))
        console.log(blogs)
        res.render("homepage", {blogs, logged_in:req.session.logged_in})
        
    } catch (error) {
        console.log("test2")
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
router.get("/dashboard", withAuth, async(req,res)=>{
    const blogData = await Blog.findAll({
        include:[{model: User, attributes:["name","id"]},  {model:Comment, include:[User]}],
        where:{userId:req.session.userId}
    })
    const blogs = blogData.map((blog)=>blog.get({plain:true}))
    console.log(blogs)
    res.render("dashboard", { name:req.session.username, logged_in:req.session.logged_in , blogs})
});

// router.get("/blog/:id", withAuth, async (req, res) => {
//       const blogData = await Blog.findByPk({
//          include: [{model: User, attributes:["name","id"]},  {model:Comment, include:[User]}],
//          where:{userId:req.session.userId}
//         });
//       console.log(blogData);
//       const blog = blogData.get({ plain: true });
//       res.render({name:req.session.name, logged_in:req.session.logged_in , blog });
//     });

// Send the rendered blog Handlebars.js template back as the response
router.get("/blog", (req,res)=>{
    res.render("blog")
})

module.exports=router