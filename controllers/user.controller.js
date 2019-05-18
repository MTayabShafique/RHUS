var conn = require('../data/dbconnection.js');
var net = require('net');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var jwt = require('jsonwebtoken');
// var session = require('express-session');


module.exports.login = function (req, res) {
	db = conn.get();
	var reception = db.collection("receptionist");
	user = req.body.username;
	pass = req.body.password;
	if(user == "Manager"){
		if(pass == "manager117"){
			
			var token = jwt.sign({username: user}, 'mysecretkey', {expiresIn: 3600});
			req.session.token = token;
			res
			.status(200)
			.redirect('/charts.html');
			// .sendFile('Manager.html', { root: path.join(__dirname, '../public') });
		} 
		 else{
		 	res
		 		.status(300)
		 		.json('Manger password wrong')
		 }
	}
	else{
		var query = { first_name: user };
		reception.findOne(query,function(err, result) {
	    if (err) {
	    	console.log(err);
	    	res.status(400).json(err);
	    }
	    else {
			// bcrypt.compareSync(password , result.password)
	    	if(pass == result.password){
	    		console.log('user found',user);
	    		var token = jwt.sign({username: result.first_name}, 'mysecretkey', {expiresIn: 3600});
	    		// req.session.token = token;
	    		req.session.token = token;
	    		console.log(req.session.email)
	    		res
			.status(200)
			.redirect('/Add_Customer.html');
			// .redirect('/charts.html');
					
	    	}
	    }
	 
	    console.log(result);
	   
	    });
	}
	
	
}

module.exports.authenticate = function (req,res,next) {
	// var headerExists =req.headers.authorization;
	var headerExists =req.session.token;
	console.log(headerExists)
	if (headerExists)
	{
		var token = req.session.token;
		// var token = req.headers.authorization.split(' ')[1];
		// next();


		jwt.verify(headerExists, 'mysecretkey', function(error, decoded){
			if(error){
				console.log(error);
				res.status(400).json('UnAuthorization');
			} else {
				req.user = decoded.username;
				next();
			}
		});
	} else {
		res
		.status(403)
		.redirect("/");
	}
};