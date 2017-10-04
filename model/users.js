var mongoose = require('mongoose');  
var userSchema = new mongoose.Schema({  
  name: String,
  mobile: String,
  gender: String,
  dob: { type: Date, default: Date.now }
});
mongoose.model('User', userSchema);