const router = require("express").Router();
let Forum = require("../models/forum.model");

router.route("/").get((req, res) => {
  Forum.find()
    .then((forums) => res.json(forums))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/add").post((req, res) => {
  const user = req.body.username;
  const name = req.body.name;
  const description = req.body.description;

  const newForum = new Forum({
    user,
    name,
    description,
    // date is added automatically
  });

  newForum
    .save()
    .then(() => res.json("Forum added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").get((req, res) => {
  Forum.findById(req.params.id)
    .then((forum) => res.json(forum))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/name/:name").get((req, res) => {
  Forum.findById({ name: req.params.name })
    .then((forum) => res.json(forum))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Forum.findByIdAndDelete(req.params.id)
    .then(() => res.json("Forum deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/name/:name").delete((req, res) => {
  Forum.findByIdAndDelete({ name: req.params.name })
    .then(() => res.json("Forum deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Forum.findById(req.params.id)
    .then((forum) => {
      forum.user = req.body.user;
      forum.name = req.body.name;
      forum.description = req.body.description;

      forum
        .save()
        .then(() => res.json("Forum updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/name/:name").post((req, res) => {
  Forum.find({ name: req.params.name })
    .then((forum) => {
      forum.user = req.body.user;
      forum.description = req.body.description;
      forum.date = Date.parse(req.body.date);

      forum
        .save()
        .then(() => res.json("Forum updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/check/:name").get((req, res) => {
  Forum.findOne({ name: req.params.name })
    .then((forum) => {
      res.json({ isAvailable: forum == null });
    })
    .catch((err) => {
      res.json({ isAvailable: true });
    });
});

module.exports = router;
