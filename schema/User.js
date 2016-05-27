
// add the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
  name : String,
  Address : String,
  email : String,
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  is_admin: {type: Boolean, default: false}
});

// create a model using it
var User = mongoose.model('User', userSchema);

// make this available to our users in our Node applications
module.exports = User;