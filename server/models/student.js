var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var studentSchema = new Schema({
    "userId" : Number,
    "userType" : Number,
    "personalInfo" :
        {
        	"studentEducation":String,
        	"studentSex":String,
            "studentName" : String,
            "studentNum" : Number,
            "studentCollege" : String,
            "studentMajor" : String,
            "studentUniversity" : String,
            "studentNativePlace" : String,
            "studentOriginPlace" :String,
            "studentPaperInfo" :  
                {
                    "paperTitle" : String,
                    "paperContent" : String
                }
            ,
            "studentTutorInfo" :  
                {
                    "tutorName" : String,
                    "tutorPosition" : String
                }
            ,
            "employmentInfo" :  
                {
                    "isEmployment" : Boolean,
                    "companyId" : String,
                    "companyName" : String
                }
            
        },
    "resumetInfo" :  
        {
            "pic" : String,
            "tel" : Number,
            "email":String,
            "introduce":String,
            "worksInfo" : [ 
                {
                    "workName" : String,
                    "workDescription" : String,
                    "workLink" : String,
                    "isShow":Boolean
                }
            ],
            "intershipInfo" : [ 
                {
                    "companyName" : String,
                    "intershipStartTime" : String,
                	"intershipEndTime":String,
                    "intershipIntroduce" : String,
                    "isShow":Boolean
                }
            ]
        },
    "sendInfo" : [ 
        {
        	"jobId" : Number,
            "companyId" : Number,
            "sendStatus" : String,
            "sendDate" : String,
            "interviewDist":String,
            "interviewDate":String,
            "interviewHalfday":String,
            "interviewTime":String
        }
    ]
})


module.exports = mongoose.model('student',studentSchema,'students');