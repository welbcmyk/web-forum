const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");

require("dotenv").config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const uri = process.env.ATLAS_URI;
mongoose
  .connect(uri, { useUnifiedTopology: true, useNewUrlParser: true, useCreateIndex: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("MongoDb connection error: " + err));

const usersRoute = require('./routes/users');
const postsRoute = require('./routes/posts');
const commentsRoute = require('./routes/comments');
const forumsRoute = require('./routes/forums');
const loginRoute = require('./routes/login');

app.use('/users', usersRoute);
app.use('/posts', postsRoute);
app.use('/comments', commentsRoute);
app.use('/forum', forumsRoute);
app.use('/user', usersRoute);
app.use('/post', postsRoute);
app.use('/comment', commentsRoute);
app.use('/forum', forumsRoute);
app.use('/login', loginRoute);

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
