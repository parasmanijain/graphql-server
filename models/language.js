const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const languageSchema = new Schema({
  name: String,
});

module.exports = mongoose.model('Language', languageSchema);
