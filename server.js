require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
// const path = require('path');
const cors = require('cors');

const app = express();
app.use(cors());

app.use(express.json());


mongoose.connect(process.env.URL_MONGOOSE, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => console.log('Connexion à MongoDB réussie'))
.catch(err => console.error('Erreur de connexion à MongoDB :', err));


app.use('/authors', require('./routes/authors'));
app.use('/publishers', require('./routes/publishers'));
app.use('/books', require('./routes/books'));


const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur démarré sur le port ${PORT}`);
});