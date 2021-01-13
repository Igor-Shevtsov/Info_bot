const mongoose = require('mongoose');


const userSchema = mongoose.Schema({
  id: {
    type: String,
    // unique: true,
  },
  name: {
    type: String,
  },
  name2: {
    type: String,
    required: true,
  },
});


module.exports = mongoose.model('User', userSchema);
