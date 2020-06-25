const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").get((req, res) => {
  User.findOne({ username: req.body.username })
    .then((user) => res.json(users))
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
