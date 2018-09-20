const express = require('express');
const app = express();
const Review = require('../models/review.js')


module.exports = function(app) {

    // INDEX
    app.get('/', (req, res) => {
      Review.find()
        .then(reviews => {
          res.render('reviews-index', { reviews: reviews });
        })
        .catch(err => {
          console.log(err);
        })
    })

}
