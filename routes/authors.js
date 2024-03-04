const express = require('express');
const router = express.Router();
const Author = require('../Models/AuthorsModels');
const Book = require('../Models/BooksModel');

router.get('/all', async (req, res) => {
  try {
    const authors = await Author.find();
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/names', async (req, res) => {
  try {
    const authors = await Author.find({}, 'name');
    res.json(authors);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/books', async (req, res) => {
  try {
    const booksByAuthor = await Book.aggregate([
      { $group: { _id: '$author', totalBooks: { $sum: 1 } } },
      { $lookup: { from: 'authors', localField: '_id', foreignField: '_id', as: 'authorInfo' } },
      { $project: { _id: 0, author: '$authorInfo.name', totalBooks: 1 } }
    ]);
    res.json(booksByAuthor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/add', async (req, res) => {
  const author = new Author({
    name: req.body.name,
    email: req.body.email,
    age: req.body.age
  });
  try {
    const newAuthor = await author.save();
    res.status(201).json(newAuthor);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.put('/update/:name', async (req, res) => {
  try {
    const author = await Author.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    if (!author) {
      return res.status(404).json({ message: "Auteur non trouvé" });
    }
    res.json(author);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.delete('/delete/:name', async (req, res) => {
  try {
    const deletedAuthor = await Author.deleteOne({ name: req.params.name });
    res.json(deletedAuthor);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
