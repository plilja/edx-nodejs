const posts = require("./posts");
const comments = require("./comments");

module.exports = (baseUrl, app) => {
  app.get(baseUrl + "posts", posts.getPosts);
  app.post(baseUrl + "posts", posts.addPost);
  app.put(baseUrl + "posts/:postId", posts.updatePost);
  app.delete(baseUrl + "posts/:postId", posts.removePost);

  app.get(baseUrl + "posts/:postId/comments", comments.getComments);
  app.post(baseUrl + "posts/:postId/comments", comments.addComment);
  app.put(
    baseUrl + "posts/:postId/comments/:commentId",
    comments.updateComment
  );
  app.delete(
    baseUrl + "posts/:postId/comments/:commentId",
    comments.removeComment
  );
};
