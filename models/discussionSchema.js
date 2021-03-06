var mongoose = require("mongoose");

// Save a reference to the Schema constructor
var Schema = mongoose.Schema;

// Using the Schema constructor, create a new UserSchema object
// This is similar to a Sequelize model
var DiscussionSchema = new Schema({
 
  discussion: {
    type: String,
    trim: true,
  }
});

// This creates our model from the above schema, using mongoose's model method
var Discussion = mongoose.model("Discussion", DiscussionSchema);

// Export the User model
module.exports = Discussion;