const express = require('express');
const router = express.Router();
const Publisher = require('../Models/PublishersModel');
const Book = require('../Models/BooksModel');

router.get('/all', async (req, res) => {
  try {
    const publishers = await Publisher.find();
    res.json(publishers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

router.get('/names', async (req, res) => {
  try {
    const publishers = await Publisher.find({}, 'name');
    res.json(publishers);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.get('/publishers', async (req, res) => {
  try {
    const booksByPublisher = await Book.aggregate([
      { $group: { _id: '$publisher', totalBooks: { $sum: 1 } } },
      { $lookup: { from: 'publishers', localField: '_id', foreignField: '_id', as: 'publisherInfo' } },
      { $project: { _id: 0, publisher: '$publisherInfo.name', totalBooks: 1 } }
    ]);
    res.json(booksByPublisher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});


router.post('/add', async (req, res) => {
  const publisher = new Publisher({
    name: req.body.name,
    location: req.body.location,
    foundedYear: req.body.foundedYear
  });
  try {
    const newPublisher = await publisher.save();
    res.status(201).json(newPublisher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

router.put('/update/:name', async (req, res) => {
  try {
    const publisher = await Publisher.findOneAndUpdate(
      { name: req.params.name },
      req.body,
      { new: true }
    );
    if (!publisher) {
      return res.status(404).json({ message: "Éditeur non trouvé" });
    }
    res.json(publisher);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


router.delete('/delete/:name', async (req, res) => {
  try {
    const deletedPublisher = await Publisher.deleteOne({ name: req.params.name });
    res.json(deletedPublisher);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
