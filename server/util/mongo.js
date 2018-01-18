//数据库参数
var MongoClient = require('mongodb').MongoClient;
var DB_CONN_STR = 'mongodb://localhost:27017/graduationProject';
//查询职位
var findMongo = function(collection,op, db, callback) {
	//获得指定的集合 
	var collection = db.collection(collection);
	//查询数据
	var where = op;
	collection.find(where).toArray(function(err, result) {
		//如果存在错误
		if(err) {
			console.log('Error:' + err);
			return;
		}
		//调用传入的回调方法，将操作结果返回
		callback(result);
	});
}

exports.findMongo = findMongo;
exports.MongoClient = MongoClient;
exports.DB_CONN_STR = DB_CONN_STR;
