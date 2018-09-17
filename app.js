const express = require('express')
const app = express()
var exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

app.listen(3000, () => {
  console.log('App listening on port 3000!')
})

let reviews = [
  { title: "Great Review" },
  { title: "Next Review" },
  { title: "Poopy Butthole" },
  { title: "Gay Bottom" }
]

// INDEX
app.get('/', (req, res) => {
  res.render('reviews-index', { reviews: reviews });
})
