const express = require('express');
const app = express();
const Review = require('../models/review.js')
const Comment = require('../models/comment.js')


//module.exports = function(app) {
//    // INDEX
//    app.get('/', (req, res) => {
//      Review.find()
//        .then(reviews => {
//          res.render('reviews-index', { reviews: reviews });
//        })
//        .catch(err => {
//          console.log(err);
//        })
//    })
//}

function reviews(){
// SHOW
app.get('/movies/:movieId/reviews/new', (req, res) => {

    render('reviews-new', { movieId: req.params.movieId })
})
  // find review
  Review.findById(req.params.id).then(review => {
    // fetch its comments
    Comment.find({ reviewId: req.params.id }).then(comments => {
      // respond with the template with both values
      res.render('reviews-show', { review: review, comments: comments })
    })
  }).catch((err) => {
    // catch errors
    console.log(err.message)
  });
});

}

module.exports = reviews
