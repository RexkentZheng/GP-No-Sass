var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var confSchema = new Schema({
	"jobType":{
		"mainClassify" : [ 
            {
                "mainName" : String,
                "secondClassify" : [ 
                    {
                        "secondName" : String,
                        "minClassify" : [ 
                        ]
                    } 
                    
                ]
            } 
        ]
	},
	"jobInfo":{
		"jobRequirement":[],
		"jobSalary":[],
		"jobType":[]
	},
	"bannerImg":[
		{
			"imgName":String
		}
	]
});

module.exports = mongoose.model('conf',confSchema,'conf');