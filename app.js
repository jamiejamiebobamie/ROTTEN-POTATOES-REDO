const express = require('express')
const methodOverride = require('method-override')
const mongoose = require('mongoose');
const app = express()
var exphbs = require('express-handlebars');
const Review = require('./models/review.js')


mongoose.connect('mongodb://localhost/rotten-potatoes', { useMongoClient: true });

require('./controllers/reviews.js')(app)
//require -- ask about it.

// INITIALIZE BODY-PARSER AND ADD IT TO APP
const bodyParser = require('body-parser');



app.use(methodOverride('_method'))
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

//DELETE
app.delete('/reviews/:id', function (req, res) {
  console.log("DELETE review")
  Review.findByIdAndRemove(req.params.id).then((review) => {
    res.redirect('/');
  }).catch((err) => {
    console.log(err.message);
  })
})

module.exports = app;
