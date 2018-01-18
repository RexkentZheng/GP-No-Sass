var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var adminSchema = new Schema({
	"userId":Number,
	"userName":String,
	"userPwd":String,
	"fullAuthority":Boolean
});

module.exports = mongoose.model('admin',adminSchema,'admins');