const router = require('express').Router();
const { Comment, Blog, User } = require("../../models");
//const withAuth = require('../../utils/auth');

// router.get("/", (req, res) => {
//     Comment.findAll({ include: [User, Blog] })
//     .then((commentdata) => res.json(commentdata))
//     .catch((err) => res.status(500).json(err));
// });

// router.get("/:id", (req, res) => {
//     Comment.findOne({ where: { id: req.params.id }, include: [User, Blog] })
//     .then((commentdata) => res.json(commentdata))
//     .catch((err) => res.json(err));
// });

router.post("/", (req, res) => {
    Comment.create(req.body)
    .then((commentdata) => res.json(commentdata))
    .catch((err) => res.json(err));
});

// router.post("/", withAuth, async(req,res)=>{
//     const commentData = await comment.create({
//         include:[{model: User, attributes:["name","id"]},  {model:Comment, include:[User]}],
//         //where:{userId:req.session.userId}
//     })
//     const comments = blogData.map((blog)=>blog.get({plain:true}))
//     console.log(comments)
//     res.render("dashboard", { name:req.session.username, logged_in:req.session.logged_in , comments})
// });

router.put("/:id", (req, res) => {
  Comment.update(req.body, { where: { comment_id: req.params.id } })
    .then((commentdata) => res.json(commentdata))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
    Comment.destroy({ where: { comment_id: req.params.id } })
    .then((commentdata) => res.json(commentdata))
    .catch((err) => res.json(err));
});

//router.get
router.get("/", async (req, res) => {
  res.render("all", { comment });
});



module.exports=router