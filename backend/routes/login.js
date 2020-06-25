const router = require("express").Router();
const User = require("../models/user.model");

router.route("/").post((req, res) => {
  User.findOne({ username: req.body.username, password: req.body.password })
    .then((user) => {
      if(user == null){
        return res.status(400).json("Illegal Combination");
      }
      else {
        return res.json(user);
      }
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
