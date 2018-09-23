const mongoose = require('mongoose')
const Schema = mongoose.Schema

// The purpose of Models is to represent a schema or a blueprint
const Review = mongoose.model('Review', {
  title: String,
  description: String,
  movieTitle: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' },
  movieId: { type: String, required: true }
});

module.exports = Review
