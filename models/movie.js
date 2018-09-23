const mongoose = require('mongoose')
const Schema = mongoose.Schema

// The purpose of Models is to represent a schema or a blueprint
const Movie = mongoose.model('Movie', {
  //title: String,
  //description: String,
  //movieTitle: String,
  reviewId: { type: Schema.Types.ObjectId, ref: 'Review' }
});

module.exports = Movie
