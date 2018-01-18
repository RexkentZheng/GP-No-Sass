var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var jobSchema = new Schema({
	"jobId": Number,
	"companyId": Number,
	"jobName": String,
	"jobType": String,
	"jobSalary": String,
	"neededMajor": String,
	"jobCategory": String,
	"jobTypeFirst": String,
	"jobTypeSecond": String,
	"jobTypeThird": String,
	"jobAtempt": String,
	"jobRelaseTime": String,
	"jobRequirement": String,
	"jobDiscription": {
		"jobDuty": String,
		"jobrequirement": String
	},
	"isOnline": Boolean,
	"jobLoaction": {
		"jobProvince": String,
		"jobCity": String,
		"jobArea": String
	},
	"createdTime":Number
})

module.exports = mongoose.model('job', jobSchema, 'jobs');