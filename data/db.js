var mongoose = require('mongoose');
var dburl = 'mongodb://localhost:27017/RHUS';
mongoose.connect(dburl);
mongoose.connection.on('connected',function () {
	console.log("mongoose Connected to :"+dburl);

});
mongoose.connection.on('disconnected', function () {
	console.log("mongoose disconnected to ");
})
mongoose.connection.on('error', function(err){
	console.log("mongoose connection erro :" + err);
});

process.on('SIGINT', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination');
		process.exit();
	})
})

process.on('SIGTEM', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination');
		process.exit();
	})
})

process.on('SIGUSR2', function(){
	mongoose.connection.close(function(){
		console.log('Mongoose disconnected through app termination');
		process.exit();
	})
})