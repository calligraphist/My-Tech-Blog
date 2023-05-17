const router = require('express').Router();
const { Blog, Comment, User } = require("../../models");
const withAuth = require('../../utils/auth');

// router.get("/", (req, res) => {
//   User.findAll({ include: [Blog, Comment] })
//     .then((userdata) => res.json(userdata))
//     .catch((err) => res.status(500).json(err));
// });

// router.get("/:id", (req, res) => {
//   User.findOne({ where: { id: req.params.id }, include: [Blog, Comment] })
//     .then((userdata) => res.json(userdata))

//     .catch((err) => res.json(err));
// });

// router.post("/", (req, res) => {
//   User.create(req.body)
//     .then((userdata) => res.json(userdata))
//     .catch((err) => res.json(err));

//     req.session.save(() => {
//       req.session.userId = userdata.id;
//       req.session.logged_in = true;

//       res.status(200).json(userdata);
//     });
// });

router.post('/',  async (req, res) => {
  try {
    const userdata = await User.create(req.body)
     req.session.save(() => {
      req.session.userId = userdata.id;
      req.session.username =userdata.name;
      req.session.logged_in = true;

      res.status(200).json(userdata);
    });
  } catch (err) {
    res.status(400).json(err);
  }
});

router.put("/:id", (req, res) => {
  Blog.update(req.body, { where: { userId: req.params.id } })
    .then((blogdata) => res.json(blogdata))
    .catch((err) => res.json(err));
});

router.delete("/:id", (req, res) => {
  Blog.destroy({ where: { userId: req.params.id } })
    .then((blogdata) => res.json(blogdata))
    .catch((err) => res.json(err));
});

// //router.get
// router.get("/", async (req, res) => {
//   res.render("all", { user });
// });


router.post('/login', async (req, res) => {
  try {
    const userdata = await User.findOne({ where: { email: req.body.email } });

    if (!userdata) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    const validPassword = await userdata.checkPassword(req.body.password);

    if (!validPassword) {
      res
        .status(400)
        .json({ message: 'Incorrect email or password, please try again' });
      return;
    }

    req.session.save(() => {
      req.session.userId = userdata.id;
      req.session.username =userdata.name;
      req.session.logged_in = true;
      
      res.json({ user: userdata, message: 'You are now logged in!' });
    });
  console.log(req.session)
  } catch (err) {
    res.status(400).json(err);
  }
});

router.post('/logout', (req, res) => {
  console.log(req.session.logged_in)
  if (req.session.logged_in) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports=router