const mongoose = require('mongoose');
const { Schema } = mongoose;

const bookReview = new Schema({
  reviewId: String,
  text: String,
  _bookId: String
});

module.exports = mongoose.model('BookReview', bookReview);
