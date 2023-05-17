const router = require("express").Router();
const { Blog, User } = require("../../models");
const withAuth = require('../../utils/auth');

// router.get("/", (req, res) => {
//   Blog.findAll({ include: [User, Blog] })
//     .then((blogdata) => res.json(blogdata))
//     .catch((err) => res.status(500).json(err));
// });

// router.get("/:id", (req, res) => {
//   Blog.findOne({ where: { id: req.params.id }, include: [User] })
//     .then((blogData) => res.json(blogData))
//     .catch((err) => res.json(err));
// });

// router.post("/", (req, res) => {
//   Blog.create(req.body)
//     .then((blogData) => res.json(blogData))
//     .catch((err) => res.json(err));
// });

// router.put("/:id", async(req, res) => {
//   const blogData = await Blog.update(req.body, { where: { blog_id: req.params.id } })
//     .then((blogData) => res.json(blogData))
//     res.render("dashboard", { name:req.session.username, logged_in:req.session.logged_in , blogs})
//     .catch((err) => res.json(err));
// });


// router.delete("/:id", (req, res) => {
//   Blog.destroy({ where: { blog_id: req.params.id } })
//     .then((blogData) => res.json(blogData))
//     .catch((err) => res.json(err));
// });

// //router.get
// router.get("/", async (req, res) => {
//   res.render("all", { blog });
// });

router.get("/", async (req, res) => {
  try {
    const blogData = await Blog.findAll({ include: [User] });
    console.log(blogData);
    if (!blogData) {
      res.status(400).json({ message: "Unable to retrieve data." });
      return;
    }
    res.status(200).json(blogData);
    res.render("blog", { blog });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.get("/:id", async (req, res) => {
  try {
    const blogData = await Blog.findByPk(req.params.id, { include: [User] });
    console.log(blogData);
    const blog = blogData.get({ plain: true });
    res.status(200).json(blog);
    res.render("blog", { blog });
  } catch (err) {
    res.status(500).json(err);
  }
});

router.post("/", withAuth, async (req, res) => {
  try {
    //const newBlog = {title:req.body.title, text:req.body.text, userId:req.session.userId, user:req.session.username}
    const blogData = await Blog.create({...req.body, userId:req.session.userId});

    console.log(req.session.userId)
    res.status(200).json({blogData, message:"post created from line 69"});
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", async (req, res) => {
  try {
    console.log(req.params.id, req.body);
    const blogData = await Blog.update(req.body, {
      where: { blog_id: req.params.id },
    });

// req.session.save(() => {
//   req.session.blog_id = blogData.id;
//   req.session.logged_in = true;

//  });
    res.status(200).json(blogData);
  } catch (err) {
    res.status(400).json(err);
  }
});

router.delete("/:id",  async (req, res) => {
  try {
    const userData = await Blog.destroy({
      where: { blog_id: req.params.id },
       // req.session.save(() => {
    //   req.session.userId = userData.id;
    //   req.session.logged_in = true;

    // });
    });
     
    if (!blogData) {
      res.status(404).json({ message: "No blog found with this id!" });
      return;
    }

    res.status(200).json(blogData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
