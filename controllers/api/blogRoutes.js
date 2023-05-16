const router = require("express").Router();
const { Blog, User } = require("../../models");
//const withAuth = require('../../utils/auth');

router.get("/", (req, res) => {
  Blog.findAll({ include: [User, Blog] })
    .then((blogdata) => res.json(blogdata))
    .catch((err) => res.status(500).json(err));
});

router.get("/:id", (req, res) => {
  Blog.findOne({ where: { id: req.params.id }, include: [User] })
    .then((blogdata) => res.json(blogdata))
    .catch((err) => res.json(err));
});

router.post("/", (req, res) => {
  Blog.create(req.body)
    .then((blogdata) => res.json(blogdata))
    .catch((err) => res.json(err));
});

router.put("/:id", (req, res) => {
  Blog.update(req.body, { where: { blog_id: req.params.id } })
    .then((blogdata) => res.json(blogdata))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  Blog.destroy({ where: { blog_id: req.params.id } })
    .then((blogdata) => res.json(blogdata))
    .catch((err) => res.json(err));
});

// //router.get
// router.get("/", async (req, res) => {
//   res.render("all", { blog });
// });

// router.get("/", async (req, res) => {
//   try {
//     const blogData = await Blog.findAll({ include: [User] });
//     console.log(blogData);
//     if (!blogData) {
//       res.status(400).json({ message: "Unable to retrieve data." });
//       return;
//     }
//     res.status(200).json(blogData);
//     res.render("blog", { blog });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.get("/:id", async (req, res) => {
//   try {
//     const blogData = await Blog.findByPk(req.params.id, { include: [User] });
//     console.log(blogData);
//     const blog = blogData.get({ plain: true });
//     res.status(200).json(blog);
//     res.render("blog", { blog });
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

// router.post("/", async (req, res) => {
//   try {
//     const tutorData = await Blog.create(req.body);

//     // req.session.save(() => {
//     //   req.session.tutor_id = tutorData.id;
//     //   req.session.logged_in = true;

//     // });
//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.put("/:id", async (req, res) => {
//   try {
//     console.log(req.params.id, req.body);
//     const blogData = await Blog.update(req.body, {
//       where: { blog_id: req.params.id },
//     });

// req.session.save(() => {
//   req.session.blog_id = blogData.id;
//   req.session.logged_in = true;

//  });
//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

// router.delete("/:id", withAuth, async (req, res) => {
//   try {
//     const tutorData = await Blog.destroy({
//       where: { blog_id: req.params.id },
//     });
//     // Tutor.destroy({
//     //   where: {
//     //     id: req.params.id,
//     //     tutor_id: req.session.blog_id,
//     //   },
//     // });

//     if (!blogData) {
//       res.status(404).json({ message: "No blog found with this id!" });
//       return;
//     }

//     res.status(200).json(blogData);
//   } catch (err) {
//     res.status(500).json(err);
//   }
// });

module.exports = router;
