const router = require('express').Router();
let Post = require('../models/post.model');

router.route('/').get((req, res) => {
    Post.find()
      .then(post => res.json(post))
      .catch(err => res.status(400).json('Error: ' + err));
  });
  
router.route('/add').post((req, res) => {
    const user = req.body.user;
    const title = req.body.title;
    const body = req.body.body;
    const forum = req.body.forum;
  
    const newPost = new Post({
        user,
        title,
        body,
        forum,
        // date is added automatically
    });
  
    newPost.save()
    .then(() => res.json('Post added!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').get((req, res) => {
    Post.findById(req.params.id)
      .then(post => res.json(post))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/:id').delete((req, res) => {
    Post.findByIdAndDelete(req.params.id)
      .then(() => res.json('Post deleted.'))
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/update/:id').post((req, res) => {
    Post.findById(req.params.id)
      .then(post => {
        post.user = req.body.user;
        post.title = req.body.title;
        post.body = req.body.body;
        post.forum = req.body.forum;
        post.date = Date.parse(req.body.date);
  
        post.save()
          .then(() => res.json('Post updated!'))
          .catch(err => res.status(400).json('Error: ' + err));
      })
      .catch(err => res.status(400).json('Error: ' + err));
  });

  router.route('/user/:id').get((req, res) => {
      Post.find({user: req.params.id})
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err))
  });
  
  router.route('/forum/:id').get((req, res) => {
      Post.find({forum: req.params.id})
      .then(posts => res.json(posts))
      .catch(err => res.status(400).json('Error: ' + err))
  });
  
module.exports = router;