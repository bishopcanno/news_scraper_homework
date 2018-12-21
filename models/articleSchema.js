var mongoose = require("mongoose");

// Get a reference to the mongoose Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new ExampleSchema object
// This is similar to a Sequelize model
var ArticleSchema = new Schema({
  title: {
    type: String,
    trim: true,
    unique: true
  },

  teaser: {
    type: String,
    trim: true
  },

  link: {
    type: String,
    trim: true,
    unique: true
  },
  
  date: {
    type: Date,
    default: Date.now
  }
  // ,
  // comments: [
  //   { 
  //     type: Schema.Types.ObjectId, 
  //     ref:'Comments' 
  //   }
  // ]
  // ,
  // users: [
  //   {
  //     type: Schema.Types.ObjectId,
  //     ref: 'User'
  //   }
  // ]
});

// This creates our model from the above schema, using mongoose's model method
var Article = mongoose.model("Article", ArticleSchema);

// Export the Example model
module.exports = Article;