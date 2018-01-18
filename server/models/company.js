var mongoose = require('mongoose');
mongoose.Promise = require('bluebird');
var Schema = mongoose.Schema;

var companySchema = new Schema({
	"userId": Number,
	"userName": String,
	"userPwd": String,
	"userType":Number,
	"regeditInfo": {
		"hrName": String,
		"hrTel": Number,
		"hrEmail": String,
		"companyName": String,
		"companyLisence": String
	},
	"companyInfo": {
		"companyLogo": String,
		"companyBaseInfo": {
			"companyType": String,
			"companyCount": Number,
			"companyHref":String,
			"companyProvince":String,
			"companyCity":String,
			"companyArea":String
		},
		"companyLabel": String,

		"companyIntroduce": String
	},
	"companyProduction": [{
		"productionImg": String,
		"productionTitle": String,
		"productionIntroduce": String,
		"productionShow":Boolean,
		"imgName":String
	}],
	"received": [{
		"jobId": Number,
		"studentId": Number,
		"sendStatus": String,
		"receivedTime": String
	}],
	"interview": [{
		'jobId':Number,
		"studentId": Number,
		"interviewDist":String,
		"interviewDate": String,
		"interviewHalfday": String,
		"interviewTime": String
	}]
});

module.exports = mongoose.model('company', companySchema, 'companies');