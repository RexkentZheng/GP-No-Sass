var multer = require('multer');


//测试接口
var storageStudentInfo = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./excel");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//定义upload方法
var uploadStudentInfo = multer({
	storage: storageStudentInfo
}).single("studentInfo"); 



//学生头像上传
var storageStudentProtrait = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./../gp/static/studentProtrait");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//定义upload方法
var uploadStudentProtrait = multer({
	storage: storageStudentProtrait
}).single("studentProtrait"); 


//公司logo部分
var storageCompanyLogo = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./../gp/static/companyLogo");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//定义upload方法
var uploadCompanyLogo = multer({
	storage: storageCompanyLogo
}).single("companyLogo"); 


//添加公司产品部分
var addCompanyProductions = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./../gp/static/companyProduction");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//定义upload方法
var uploadAddCompanyProductions = multer({
	storage: addCompanyProductions
}).single("companyProduction"); 


//修改公司产品部分
var changeCompanyProductions = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./../gp/static/companyProduction");
	},
	filename: function(req, file, callback) {
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//定义upload方法
var uploadChangeCompanyProductions = multer({
	storage: changeCompanyProductions
}).single("companyProduction"); 

//公司执照部分
var storageCompanyLicense = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./../gp/static/companyLicense");
	},
	filename: function(req, file, callback) {
		let suffix = file.originalname.split('.');
//		callback(null, 'license.'+suffix[1]);
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//定义upload方法
var uploadCompanyLicense = multer({
	storage: storageCompanyLicense
}).single("companyLicense"); 


//首页banner部分
var storageBanner = multer.diskStorage({
	destination: function(req, file, callback) {
		callback(null, "./../gp/static/banner");
	},
	filename: function(req, file, callback) {
		let suffix = file.originalname.split('.');
		callback(null, file.fieldname + "_" + Date.now() + "_" + file.originalname);
	},
});

//定义upload方法
var uploadBannerImg = multer({
	storage: storageBanner
}).single("bannerImg"); 


exports.uploadStudentProtrait = uploadStudentProtrait;
exports.uploadCompanyLogo = uploadCompanyLogo;
exports.uploadAddCompanyProductions = uploadAddCompanyProductions;
exports.uploadChangeCompanyProductions = uploadChangeCompanyProductions;
exports.uploadCompanyLicense = uploadCompanyLicense;
exports.uploadStudentInfo = uploadStudentInfo;
exports.uploadBannerImg = uploadBannerImg;
