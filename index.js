const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const path = require('path');
const app = express();

app.set('view engine', 'ejs');

app.get('/', function (req, res) {
  let url = req.query.url ? req.query.url : null;
  if (url) {
    request(url, function (error, response, html) {
      let data;
      let title;
      if (!error) {
        var $ = cheerio.load(html);
        title = $('h1');
        data = $('[name=articleBody]').html();
      }
      res.render('article', { data, title });
    });
  } else {
    res.render('home');
  }

  // "<div class='d-flex'</div>"
});

// /* LISTEN ON PORT */
// app.listen("8081");

if (process.env.NODE_ENV === 'production') {
  // Serve any static files
  app.use(express.static(path.join(__dirname, 'views')));
  // Handle React routing, return all requests to React app
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
