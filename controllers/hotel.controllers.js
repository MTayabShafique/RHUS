var conn = require('../data/dbconnection.js');
var net = require('net');
var path = require('path');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
//ADD receptionist Date into database
module.exports.recept = function (req, res) {
	var db = conn.get();
	var collections = db.collection("receptionist");

	var newRecep;
	if(req.body && req.body.first_name && req.body.last_name && req.body.CNIC && req.body.phone && req.body.address && req.body.start && req.body.end &&  req.body.password){
		newRecep = req.body
		// newRecep.password = bcrypt.hashSync(newRecep.password,bcrypt.genSaltSync(10));
		
		collections.insertOne(newRecep, function (err , response) {
		res
		.status(201)
		.redirect("/charts.html")
		});
	} 
	else
		res
		.status(200)
		.json('error in post')

}
module.exports.consump = function (req, res) {
}
//addCustomer Data and Allocation Data
module.exports.custom = function (req, res) {
	var db = conn.get();
	req.body.CNIC = parseInt(req.body.CNIC , 10)
	var customer = db.collection("Customers");
	var allocat = db.collection("Allocation");
	var Room = db.collection("Rooms");

	var newCustom= {};
	var allocate={};
	var roomvar={ service:{}};
	if(req.body && req.body.first_name && req.body.last_name && req.body.CNIC && req.body.phone && req.body.address ){
		newCustom.first_name = req.body.first_name;
		newCustom.last_name = req.body.last_name;
		newCustom.email = req.body.email;
		newCustom.CNIC = req.body.CNIC;
		newCustom.phone = req.body.phone;
		newCustom.address = req.body.address;
		allocate.custemr_id =req.body.CNIC;
		allocate.room_id = req.body.room;
		allocate.check_in = new Date(req.body.checkin);
		allocate.check_out = new Date(req.body.checkout);
		roomvar.room_status = "occupied"; 
		roomvar.service.ac = req.body.ac == 'true';
		roomvar.service.heater = req.body.heater == 'true';
		roomvar.service.refigator = req.body.ref == 'true';
		roomvar.service.lighting = req.body.light == 'true';

		allocat.insertOne(allocate, function (err , response) {
		 console.log(response);
		});

		var myquery = { room_id: req.body.room };
        var newvalues = { $set:roomvar};

		Room.updateOne(myquery, newvalues);
		customer.insertOne(newCustom, function (err , response) {
		res
		.status(201)
		.redirect("/avail.html")
		});
	}
	else
		res
		.status(200)
		.json('error in post')
}

//Get All receptionist from database
module.exports.recepdata = function (req, res) {

	var db = conn.get();
	var collections = db.collection("receptionist");
  collections.find({}).toArray(function(err, result) {
    if (err) throw err;
    res
    .status(201)
    .json(result);
  });
}
//Get Room Availability
module.exports.avail = function(req, res){
	var db = conn.get();
	var collection = db.collection("Rooms");
	collection.find({room_status: "empty"},{room_id:true , loaction: true , room_status: true}).toArray(function(err,result){
		if (err) throw err;
		res
		.status(200)
		.json(result)
	})
}
//Get Consumption Data of individual Room And 
module.exports.consumption = function (req,res) {
	var db = conn.get();
	var energy = {
		room0 : [],
		room1 : [],
		dates : []
	};
	var room = req.body.room_id
	var consump = db.collection("consump");
	var query = { room_no: "100" };
	
	consump.aggregate([{$group :{_id: "$room_no", energyarr: {$push: "$energy"} , dates : {$push: "$date"}}}])
	.toArray(function(err,data){
		res
		.status(200)
		.json(data)
	});
	
	
	
	
}
//Consumption of minimum 10 days
module.exports.consumpt = function (req,res) {
	var db = conn.get();
	var room = req.body.room_id
	var collection = db.collection("consump");
	var query = { Room_no: room };
	collection.find().sort({date : 1}).limit(10).toArray(function (err, result) {
		if(err) throw err;
		res
		.status(200)
		.json(result)

	});

}
//get Empty rooms
module.exports.roomemp = function (req,res){
	var db = conn.get();
	var room = db.collection("Rooms");
	room.find({room_status: "empty"},{room_id:true }).toArray(function(err,result){
		if (err) throw err;
		res
		.status(200)
		.json(result)
	})

}
module.exports.roomrec = function (req,res){
	var db = conn.get();
}

module.exports.consumpt1 = function(req,res){
	var roomid = req.params.Room;
	var db = conn.get();
	var consump = db.collection('consump');
	var query = {room_no: roomid};
	console.log(typeof roomid);
	consump.aggregate([{$group :{_id: {
					'room': '$room_no',
                    'year': { '$year': "$date" },
                    'month': { '$month': "$date" },
                    'day': { '$dayOfMonth': "$date" }
                },energyarr: {$push: "$energy"},newdates:{ $push : {$dateToString:{format:"%Y,%m,%d" , date: '$date'}}} , consum : {$sum: "$energy"}}},
                {$sort:{ '_id.year':-1, '_id.month':-1, '_id.day': -1}},
                {$limit: 20},
                {$match: {'_id.year': 2018 , '_id.room': roomid}}]).toArray(function (err,result) {
                	if(err) throw err

                	res
                		.status(200)
                		.json(result)



                })
	
}

module.exports.forgetp= function (req,res) {
	var username = req.body.mail;
	var pass = req.body.new_pass
	var db = conn.get();
	var reception = db.collection('receptionist');
	var myquery = { email: username };
  var newvalues = { $set: {password: pass  } };
  reception.updateOne(myquery, newvalues, function(err, result) {
    if (err) throw err;
    
    res
		.status(200)
		.redirect('/')
    
  });
}
module.exports.change= function (req,res) {
var username = req.user;
	var pass = req.body.new_pass;
	var pass_old = req.body.old_pass;

	var db = conn.get();
	var reception = db.collection('receptionist');
	var myquery = { email: username };
	reception.find(myquery).toArray(function (err,result) {
		if (err) throw err;
		if (result.password===pass_old)
		{}
		else{
    	res
    		.status(434)
    		.json('incorrect old password')
			}

	})
  var newvalues = { $set: {password: pass  } };
  reception.updateOne(myquery, newvalues, function(err, res) {
    if (err) throw err;
    res
    	.status(200)
    	.json('password has been changer');

  });

}

module.exports.view_customer = function (req,res) {
	var db = conn.get();
	var customer = db.collection("Customers");
  customer.find({}).toArray(function(err, result) {
    if (err) throw err;
    res
    .status(201)
    .json(result);
  });
}
//store sensor data
module.exports.sensor = function (req,res){
	var db = conn.get();
	
	
	myobj =req.body
        var consumpt= db.collection("consump");
        var docs = [];
        var consumption = {};
        var consumption1 = {};
        
		console.log(myobj)
	 	
        var energy = parseFloat(myobj.Sensor0, 10);
        console.log(typeof myobj.Sensor0)
        consumption.room_no = "100";
        consumption.energy = energy<20?0:energy*220;
        consumption.date = new Date();
        docs.push(consumption)
        var energy1 = parseFloat(myobj.Sensor1, 10);
        consumption1.room_no = "101";
        consumption1.energy = energy1<20?0:energy1*220;
        consumption1.date = new Date();
        docs.push(consumption1)
        consumpt.insertMany(docs, function(error, inserted) {
            if(error) {
                console.error(error);
            }
            else {
				console.log("Successfully inserted: " , inserted );
            	res
            		.status(200)
            		.json(inserted)
            }

        }); 
}
//get Consumption by year and monthe
module.exports.consumptyear = function (req,res) {
	var year = req.params.year;
	var month = req.params.year;
	var day = req.params.year
	var db = conn.get();

	db.collection('consump').aggregate([{$group :{_id: {
					'room': '$room_no',
                    'year': { '$year': "$date" },
                    'month': { '$month': "$date" },
                    'day': { '$dayOfMonth': "$date" }
                }, energyarr: {$push: "$energy"} , consum : {$sum: "$energy"}}},
                {$sort:{_id: 1}},
                {$match: {'_id.month':month, '_id.year': year,'_id.day': new Date().getDay()}}]).toArray(function(err,data){
    res
    .status(200)
    .json(data)
  });
}

module.exports.consumption2 = function (req,res) {
	
	var db = conn.get();

	db.collection('consump').aggregate([{$group :{_id: {
					'room': '$room_no',
                    'year': { '$year': "$date" },
                    'month': { '$month': "$date" },
                    'day': { '$dayOfMonth': "$date" }
                }, energyarr: {$push: "$energy"} , consum : {$sum: "$energy"}}},

                {$match: {'_id.month':5,'_id.year': 2018 ,'_id.day' : 30}}]).toArray(function(err,data){
   	
    res
    .status(200)
    .json(data)
  });
}
//update Receptionist data
module.exports.updaterecept = function (req, res) {
	var db = conn.get();
	var collections = db.collection("receptionist");

	var newRecep;
	if(req.body && req.body.first_name && req.body.last_name && req.body.CNIC && req.body.phone && req.body.address && req.body.start && req.body.end &&  req.body.password){
		newRecep = req.body
		// newRecep.password = bcrypt.hashSync(newRecep.password,bcrypt.genSaltSync(10));
		req.body.CNIC = parseInt(req.body.CNIC , 10)
		collections.updateOne(newRecep, function (err , response) {
		res
		.status(201)
		.json(response.ops)
		});

	}
	else
		res
		.status(200)
		.json('error in post')
// 		 reception.updateOne(myquery, newvalues, function(err, res) {
//     if (err) throw err;
//     res
//     	.status(200)
//     	.json('password has been changer');

//   });
// }

}

	

module.exports.recep = function (req,res) {
	db = conn.get();
	var recept_id = parseInt(req.params.id , 10)
	var myquery = {CNIC : recept_id};
	var reception = db.collection("receptionist");
	console.log(typeof recept_id+"  "+ recept_id)
	reception.find(myquery).toArray(function (err,result) {
		if (err) throw err;
		
		else{
    	res
    		.status(200)
    		.json(result)
			}

	})
	// body...
}

module.exports.room_service = function (req,res) {
	db = conn.get();
	var rfidp = req.params.id;
	// parseInt(req.params.id , 10)
	var myquery = {rfid : rfidp};
	var room = db.collection("Rooms");
	console.log(typeof rfidp+"  "+ rfidp)
	room.find(myquery).limit(1).toArray(function (err,result) {
		if (err) throw err;
		if (result.length==0){
			res
    		.status(200)
    		.json(result)
		}
		else{
    	res
    		.status(200)
    		.json(result[0].service)
			}

	})
	
}

module.exports.check_custom = function (req,res) {
	db = conn.get();
	var custom = req.params.id;
	// parseInt(req.params.id , 10)
	var myquery = {rfid : rfidp};
	var room = db.collection("Rooms");
	console.log(typeof rfidp+"  "+ rfidp)
	room.find(myquery).limit(1).toArray(function (err,result) {
		if (err) throw err;
		
		else{
    	res
    		.status(434)
    		.json(result[0].service)
			}

	})
	// body...
}

module.exports.check_recept = function (req,res) {
	db = conn.get();
	var rfidp = req.params.id;
	// parseInt(req.params.id , 10)
	var myquery = {rfid : rfidp};
	var room = db.collection("Rooms");
	console.log(typeof rfidp+"  "+ rfidp)
	room.find(myquery).limit(1).toArray(function (err,result) {
		if (err) throw err;
		
		else{
    	res
    		.status(434)
    		.json(result[0].service)
			}

	})
	// body...
}
module.exports.customer_allocation = function (req,res) {
	db = conn.get();
	var customer_id = parseInt(req.params.id,10);
	var customer = db.collection("Customers");
	customer.aggregate([
   {$lookup:
       {from: "Allocation",
         localField: "CNIC",
         foreignField: "custemr_id",
         as: "customer"
       }},
  {$sort:{"_id":1,"customer.check_in":1}},
  {$match: {'CNIC':customer_id }}
]).toArray(function (err,result) {
	if(err) throw err;
	else{
		res
			.status(200)
			.json(result);
	}
})
	


	
}

module.exports.testc = function (req,res) {
	console.log(req.body)
	res
		.status(200)
		.json(req.body)
}
