var express = require("express");
// Require axios and cheerio. This makes the scraping possible
var mongoose = require("mongoose");

// Initialize Express
var app = express();
var PORT = process.env.PORT || 3000;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));

// Hook mongojs configuration to the db variable
// var db = require("./models")
mongoose.connect("mongodb://localhost/nprScraperDB", { useNewUrlParser: true });

require("./routes/apiRoutes")(app);

// Listen on port 3000
app.listen(PORT, function() {
  console.log(`App running on port ${PORT}`);
});