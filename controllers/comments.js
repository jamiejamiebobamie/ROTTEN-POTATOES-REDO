const express = require('express');
const app = express();
const Comment = require('../models/comment.js')

module.exports = (app) => {

    // CREATE Comment
  app.post('/reviews/comments', (req, res) => {
    Comment.create(req.body).then(comment => {
      res.redirect(`/reviews/${comment.reviewId}`);
    }).catch((err) => {
      console.log(err.message);
    });
  });
