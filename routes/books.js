const express = require('express');
const router = express.Router();
const Book = require('../Models/BooksModel');
const Author = require('../Models/AuthorsModels');
const Publisher = require('../Models/PublishersModel');


router.get('/all', async (req, res) => {
  try {
    const books = await Book.find();
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/authors/:livrename', async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.livrename });
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    const authors = await Author.find({ _id: { $in: book.author } });
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/publishers/:livrename', async (req, res) => {
  try {
    const book = await Book.findOne({ title: req.params.livrename });
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    const publisher = await Publisher.findById(book.publisher);
    res.json(publisher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/listCategorie/:category', async (req, res) => {
  try {
    const books = await Book.find({ category: req.params.category });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/:annee1/:annee2', async (req, res) => {
  try {
    const books = await Book.find({
      publicationYear: { $gte: req.params.annee1, $lte: req.params.annee2 }
    });
    res.json(books);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/add', async (req, res) => {
  const book = new Book({
    title: req.body.title,
    author: req.body.author,
    publisher: req.body.publisher,
    publicationYear: req.body.publicationYear,
    category: req.body.category
  });
  try {
    const newBook = await book.save();
    res.status(201).json(newBook);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/update/:title', async (req, res) => {
  try {
    const book = await Book.findOneAndUpdate(
      { title: req.params.title },
      req.body,
      { new: true }
    );
    if (!book) {
      return res.status(404).json({ message: "Livre non trouvé" });
    }
    res.json(book);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/delete/:title', async (req, res) => {
  try {
    const deletedBook = await Book.deleteOne({ title: req.params.title });
    res.json(deletedBook);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
