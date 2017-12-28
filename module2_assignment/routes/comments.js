const db = require("./db");

module.exports.getComments = (req, res) => {
  const post = db.posts[req.params.postId];
  res.status(200).send(post.comments);
};

module.exports.addComment = (req, res) => {
  const post = db.posts[req.params.postId];
  const comment = req.body;
  const id = post.comments.length;
  post.comments.push(comment);
  res.status(201).send({ id: id });
};

module.exports.updateComment = (req, res) => {
  const post = db.posts[req.params.postId];
  post.comments[req.params.commentId] = req.body;
  res.status(200).send();
};

module.exports.removeComment = (req, res) => {
  const post = db.posts[req.params.postId];
  post.comments.splice(req.params.commentId, 1);
  res.status(204).send();
};
