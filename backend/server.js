const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

mongoose
  .connect("mongodb://mongo:27017/forum-web-app", { useNewUrlParser: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const commentsRoute = require('./routes/comments');
const forumsRoute = require('./routes/forums');

app.use('/users', usersRoute);
app.use('/posts', postsRoute);
app.use('/comments', commentsRoute);
app.use('/forums', forumsRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
