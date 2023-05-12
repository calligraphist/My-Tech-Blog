const router = require('express').Router();
const { Blog, Comment, User } = require("../../models");
//const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
  User.findAll({ include: [Blog, Comment] })
    .then((userdata) => res.json(userdata))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  User.findOne({ where: { id: req.params.id }, include: [Blog, Comment] })
    .then((userdata) => res.json(userdata))
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  User.create(req.body)
    .then((userdata) => res.json(userdata))
    .catch((err) => res.json(err));
});

router.put("/:id", (req, res) => {
  User.update(req.body, { where: { blog_id: req.params.id } })
    .then((userdata) => res.json(userdata))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  User.destroy({ where: { blog_id: req.params.id } })
    .then((userdata) => res.json(userdata))
    .catch((err) => res.json(err));
});

// //router.get
// router.get("/", async (req, res) => {
//   res.render("all", { user });
// });


module.exports=router