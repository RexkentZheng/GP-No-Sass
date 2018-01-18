var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var testSchema = new Schema({
	"name":String,
	"age":Number,
	"sex":String,
	"StudentNum":Number,
	"op":String,
	"np":String,
})

module.exports = mongoose.model('test',testSchema,'test');