const mongoose = require('mongoose');

const publisherSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  location: {
    type: String,
    required: true
  },
  foundedYear: {
    type: Number,
    required: true
  }
});


const Publisher = mongoose.model('Publisher', publisherSchema);

module.exports = Publisher;
