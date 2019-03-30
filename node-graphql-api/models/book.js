const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookSchema = new Schema({
  bookId: String,
  name: String,
  genre: String,
  _authorId: String
});

module.exports = mongoose.model('Book', bookSchema);
