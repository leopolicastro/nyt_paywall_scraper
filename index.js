const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const path = require("path");
const app = express();

app.set("view engine", "ejs");

app.get("/", function(req, res) {
  let url = req.query.url ? req.query.url : null;
  if (url) {
    console.log("Scrape Request initiated: " + url);
    request(url, function(error, response, html) {
      console.log("Successfully retrieved data from " + url);
      let data;
      let title;
      if (!error) {
        var $ = cheerio.load(html);
        title = $("h1");
        data = $("[name=articleBody]").html();
      }
      console.log("Outputting Scrape Data for " + url);
      res.render("article", { data, title });
    });
  } else {
    res.send(
      "Place your paid NYT article in the URL above like this. nyt.thruhere.net/?url=pastearticlehere"
    );
  }
});

/* LISTEN ON PORT */
app.listen("8081");
exports = module.exports = app;

if (process.env.NODE_ENV === "production") {
  // Serve any static files
  app.use(express.static(path.join(__dirname, "views")));
  // Handle React routing, return all requests to React app
}

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
