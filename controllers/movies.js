const express = require('express');
const app = express();
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('your api key')
const Review = require('../models/review.js');
const Comment = require('../models/comment.js')
const Movie = require('../models/movie.js')

app.get('/', (req, res) => {
  moviedb.miscNowPlayingMovies().then(response => {
    res.render('movies-index', { movies: response.results });
  }).catch(console.error)
})

// SHOW
app.get('/movies/:id', (req, res) => {
  // find review
  moviedb.movieInfo({ id: req.params.id }).then(movie => {
      res.render('movies-show', { movie: movie })
    })
  }).catch((err) => {
    // catch errors
    console.log(err.message)
  });
});



//app.get('/movies/:id', (req, res) => {
//    moviedb.movieInfo({ id: req.params.id }).then(movie => {
//        res.render('movies-show', { movie: movie });
//    }).catch(console.error) })


module.exports = app
