var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applySchema = new Schema({
  "title": String,
  "classFirst": String,
  "classSecond": String,
  "content": String
});

module.exports = mongoose.model('nuxt', applySchema, 'nuxt');