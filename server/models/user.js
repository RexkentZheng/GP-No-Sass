var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var userSchema = new Schema({
	"userName": String,
	"userPwd": String,
	"userType": Number,
	"userId": Number,
	"isWaitting": Boolean,
	"isPass": Boolean
})

module.exports = mongoose.model('user', userSchema, 'users');