var axios = require("axios");
var cheerio = require("cheerio");
var db = require("../models");

module.exports = function(app) {
  
  app.get("/api/scrape", function(req, res) {
    axios.get("https://www.npr.org/").then(function(response) {

      var $ = cheerio.load(response.data);

      var result = {};
        
      $(".story-wrap").each(function (i, element) {
        let title = $(this).find("h3.title").text();

        let link = $(this).attr("href");
        
        if (link === undefined) {
          link = $(this).find("a").attr("href");
        };
        
        let teaser = $(this).find("p.teaser").text();
      
          // Add the text and href of every link, and save them as properties of the result object
        result.title = title;
        result.link = link;
        result.teaser = teaser;
        // Create a new Article using the `result` object built from scraping
        db.Article.create(result)
        .then( function(dbArticle) {
          // View the added result in the console
          console.log(dbArticle);
        })
        .catch(function(err) {
          // If an error occurred, log it
          console.log(err);
        });
      });
    });  
  });    
  
  app.get("/api/current/:user", function(req, res) {
    db.User.findOne({ username: req.params.user})
    .then( function(dbUser) {
      res.json(dbUser);
    })
    .catch(function(err) {
      res.json(err);
    });
  });

  app.get("/api/articles", function(req, res) {
    db.Article.find({}).sort({date: -1})
      .then( function(dbArticle) {
        // If we were able to successfully find Articles, send them back to the client
        res.json(dbArticle);
      })
      .catch( function(err) {
        // If an error occurred, send it to the client
        res.json(err);
      });
  });

  app.post("/api/discussion", function(req, res){
    db.Discussion.create(req.body)
      .then( function(dbDiscussion) {
        res.json(dbDiscussion);
      })
      .catch( function(err) {
        res.json(err);
      });
  });

  app.post("/api/submit", function(req, res) {
    db.User.create(req.body)
      .then( function(dbUser) {
        res.json(dbUser);
      })
      .catch( function(err) {
        res.json(err);
      });
  });
  // route to push the objects into the comments array in the articles collection
  app.post("/api/article/:id", function(req, res) {
    db.Article.findOneAndUpdate({ _id: req.params.id }, push)
    .then( function(dbArticle) {
      res.json(dbArticle)
    })
    .catch( function(err) {
      res.json(err);
    }) 
  })

};  
  
  // app.get("/api/articles", function(req, res) {
  //   // Grab every document in the Articles collection
  //   db.Article.find({})
  //     .then(function(dbArticle) {
  //       // If we were able to successfully find Articles, send them back to the client
  //       res.json(dbArticle);
  //     })
  //     .catch(function(err) {
  //       // If an error occurred, send it to the client
  //       res.json(err);
  //     });
  // });
  

  // app.post("/submit", function(req, res) {
  //   // Create a new Note in the db
  //   db.Note.create(req.body)
  //     .then(function(dbNote) {
  //       // If a Note was created successfully, find one User (there's only one) and push the new Note's _id to the User's `notes` array
  //       // { new: true } tells the query that we want it to return the updated User -- it returns the original by default
  //       // Since our mongoose query returns a promise, we can chain another `.then` which receives the result of the query
  //       return db.User.findOneAndUpdate({}, { $push: { notes: dbNote._id } }, { new: true });
  //     })
  //     .then(function(dbUser) {
  //       // If the User was updated successfully, send it back to the client
  //       res.json(dbUser);
  //     })
  //     .catch(function(err) {
  //       // If an error occurs, send it back to the client
  //       res.json(err);
  //     });
  // });

