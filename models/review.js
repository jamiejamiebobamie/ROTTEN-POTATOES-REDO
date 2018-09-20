const mongoose = require('mongoose')

// The purpose of Models is to represent a schema or a blueprint
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String
});

module.exports = Review
