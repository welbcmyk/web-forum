const router = require("express").Router();
let Comment = require("../models/comment.model");

/*router.route('/').get((req, res) => {
    Comment.find()
    .then(comments => res.json(comments))
    .catch(err => res.status(400).json('Error: ' + err));
});*/

router.route("/add").post((req, res) => {
  const user = req.body.user;
  const body = req.body.body;
  const post = req.body.post;
  // default date is the date right now

  const newComment = new Comment({
    user,
    body,
    post,
  });
  newComment
    .save()
    .then(() => res.json("Commented Successfully!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/:id").delete((req, res) => {
  Comment.findByIdAndDelete(req.params.id)
    .then(() => res.json("Comment deleted."))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/update/:id").post((req, res) => {
  Comment.findById(req.params.id)
    .then((comment) => {
      comment.user = req.body.user;
      comment.body = req.body.body;
      comment.post = req.body.post;

      comment
        .save()
        .then(() => res.json("Comment updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/user/:id").get((req, res) => {
  Comment.find({ user: req.params.id })
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/post/:id").get((req, res) => {
  Comment.find({ post: req.params.id })
    .then((comments) => res.json(comments))
    .catch((err) => res.status(400).json("Error: " + err));
});

router.route("/commentCount/:postid").get((req, res) => {
  Comment.countDocuments({ post: req.params.postid })
  .then(result => res.json({ count: result }))
  .catch(err => console.log(err));
});

module.exports = router;
