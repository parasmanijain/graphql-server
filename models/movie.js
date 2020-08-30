const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const movieSchema = new Schema({
  name: String,
  year: String,
  genreID: String,
  languageID: String,
  directorID: String,
});

module.exports = mongoose.model('Movie', movieSchema);
