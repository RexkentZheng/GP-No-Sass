const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const nuxtConfSchema = new Schema({
  "class": {
    "classFirst": String,
    "classSecond": Array,
  },
});

module.exports = mongoose.model('nuxt-conf', nuxtConfSchema, 'nuxt-conf');