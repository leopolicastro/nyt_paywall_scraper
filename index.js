const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
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
    res.json({ error: "URL Param not defined." });
  }
});

/* LISTEN ON PORT */
app.listen("8081");
console.log("NYT Started on Port 8081");
exports = module.exports = app;
