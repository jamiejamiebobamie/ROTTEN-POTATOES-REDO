const express = require('express');
const app = express();
const MovieDb = require('moviedb-promise')
const moviedb = new MovieDb('your api key')
const Review = require('../models/review.js');
const Comment = require('../models/comment.js')
const Movie = require('../models/movie.js')

//app.get('/', (req, res) => {
//  moviedb.miscNowPlayingMovies().then(response => {
//    res.render('movies-index', { movies: response.results });
//  }).catch(console.error)
//})

function movies(){
app.get('/movies/:movieId/reviews/new', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then(movie => {
    if (movie.video) {
      moviedb.movieVideos({ id: req.params.id }).then(videos => {
        movie.trailer_youtube_id = videos.results[0].key
        renderTemplate(movie)
      })
    } else {
      renderTemplate(movie)
    }

    function renderTemplate(movie)  {
      res.render('movies-show', { movie: movie });
    }

  }).catch(console.error)
})

app.get('/movies/:id', (req, res) => {
  moviedb.movieInfo({ id: req.params.id }).then(movie => {
    Review.find({ movieId: req.params.id }).then(reviews => {
      res.render('movies-show', { movie: movie, reviews: reviews });
    })
  }).catch(console.error)
})
}

module.exports = movies
