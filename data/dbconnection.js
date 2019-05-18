var MongoClient = require('mongodb').MongoClient;
var dburl = 'mongodb://localhost:27017/RHUS'

var _connection = null;
var open = function (argument) {
	MongoClient.connect(dburl, function (err, db) {
		if (err) {
			console.log("Db connection failed");
			return;
		}
		_connection = db;
		
	});
};

var get = function(){
	return _connection;
}

module.exports = {
	open : open,
	get : get
}