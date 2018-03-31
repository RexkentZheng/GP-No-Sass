var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var applySchema = new Schema({
  "userId": Number,
  "userName": String,
  "userPwd": String,
  "hrName": String,
  "hrTel": Number,
  "hrEmail": String,
  "companyName": String,
  "companyLisence": String,
  "isChecked": Boolean,
  "applyDate": String
});

module.exports = mongoose.model('apply', applySchema, 'applying');