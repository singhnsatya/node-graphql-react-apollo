const mongoose = require('mongoose');
const { Schema } = mongoose;

const authorSchema = new Schema({
  authorId: String,
  name: String,
  age: Number
});

module.exports = mongoose.model('Author', authorSchema);
