const db = require("./db");

module.exports.getPosts = (req, res) => {
  res.status(200).send(db.posts);
};

module.exports.addPost = (req, res) => {
  const id = db.posts.length;
  const newPost = req.body;
  newPost.comments = [];
  db.posts.push(newPost);
  res.status(201).send({ id: id });
};

module.exports.updatePost = (req, res) => {
  db.posts[req.params.postId] = req.body;
  res.status(200).send();
};

module.exports.removePost = (req, res) => {
  db.posts.splice(req.params.postId, 1);
  res.status(204).send();
};
