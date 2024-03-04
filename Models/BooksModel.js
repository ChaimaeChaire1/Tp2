const mongoose = require('mongoose');


const bookSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  author: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Author',
    required: true
  },
  publisher: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Publisher',
    required: true
  },
  publicationYear: {
    type: Number,
    required: true
  }
});



const Book = mongoose.model('Book', bookSchema);


module.exports = Book;
