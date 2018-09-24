const express = require('express')
const app = express()
var exphbs = require('express-handlebars');
const mongoose = require('mongoose');
const methodOverride = require('method-override')
const bodyParser = require('body-parser');
const Review = require('./models/review.js')
const Comment = require('./models/comment.js')
const reviews = require("./controllers/reviews.js");
const comments = require('./controllers/comments.js');
const movies = require('./controllers/movies.js');
const Movie = require('./models/movie.js')



mongoose.connect(process.env.MONGODB_URI || 'mongodb://localhost/rotten-potatoes', {useNewUrlParser: true})
.then(() => {
    console.log("Connected to DB");
})
.catch( err => {
    throw err;
});

comments();
movies();
reviews();
postComments();

app.use(express.static('public'));

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({ extended: true }));
// The following line must appear AFTER const app = express() and before your routes!
//app.use(bodyParser.urlencoded({ extended: true }));

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

//let reviews = [
//  { title: "Great Review" },
//  { title: "Next Review" },
//  { title: "Poopy Butthole" },
//  { title: "Gay Bottom" }
//]

//comments(app, Comment);

app.get('/', (req, res) => {
    Review.find()
        .then(reviews => {
            res.render('reviews-index', {reviews: reviews})
        })
        .catch(err => {
            console.log(err)
        })
    //res.render('home', {msg: 'Hello World!'});
});



// NEW
app.get('/reviews/new', (req, res) => {
  res.render('reviews-new', {});
})

// CREATE
app.post('/reviews', (req, res) => {
  Review.create(req.body).then((review) => {
    console.log(review)
    res.redirect(`/reviews/${review._id}`) // Redirect to reviews/:id
  }).catch((err) => {
    console.log(err.message)
  })
})

// SHOW
app.get('/reviews/:id', (req, res) => {
  Review.findById(req.params.id).then((review) => {
    res.render('reviews-show', { review: review })
  }).catch((err) => {
    console.log(err.message);
  })
})

// EDIT
app.get('/reviews/:id/edit', (req, res) => {
  Review.findById(req.params.id, function(err, review) {
    res.render('reviews-edit', {review: review});
  })
})

// UPDATE
app.put('/reviews/:id', (req, res) => {
  Review.findByIdAndUpdate(req.params.id, req.body)
    .then(review => {
      res.redirect(`/reviews/${review._id}`)
    })
    .catch(err => {
      console.log(err.message)
    })
})

app.delete('/reviews/:id', function (req, res) {
    console.log("DELETE review")
    Review.findByIdAndRemove(req.params.id).then((review) => {
        res.redirect('/');
    }).catch((err) => {
        console.log(err.message);
    })
})


module.exports = app;
//import comments from 'comments';
