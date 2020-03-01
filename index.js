const express = require("express");
const request = require("request");
const cheerio = require("cheerio");
const app = express();

const publicDirectoryPath = path.join(__dirname, "../public/");
app.use(express.static(publicDirectoryPath));

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

const port = process.env.PORT || 8080;
app.listen(port, () => {
  console.log(`API listening on port ${port}...`);
});
