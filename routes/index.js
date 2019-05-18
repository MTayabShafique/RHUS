var express = require('express');
var router = express.Router();
var addcon = require('../controllers/hotel.controllers.js');
var user = require('../controllers/user.controller');

router
	.route('/recept')
	.get()
	.post(user.authenticate,addcon.recept)

router
	.route('/login_check')
	.post(user.login)
	.get()

router
	.route('/consumption')
	.get(user.authenticate,addcon.consumption)
router
	.route('/details')
	.get(user.authenticate,addcon.recepdata)
router
	.route('/availablity')
	.get(user.authenticate,addcon.avail)

router
	.route('/consump')
	.get(user.authenticate,addcon.consumpt)

router
	.route('/roomemp')
	.get(user.authenticate,addcon.roomemp)
router
	.route('/custom')
	.post(user.authenticate,addcon.custom)
router
	.route('/consumpt/:Room')
	.get(user.authenticate,addcon.consumpt1)
	.post()
router
	.route('/forget')
	.post(addcon.forgetp)
	.get()

router
	.route('/change')
	.post(user.authenticate,addcon.change)

router
	.route('/viewCustomer')
	.get(user.authenticate,addcon.view_customer)

router
	.route('/Sensors')
	.post(addcon.sensor)
router
	.route('/update/:id')
	.get(addcon.recep)
router
	.route('/service/:id')
	.get(addcon.room_service)
// router
// 	.route('/customer/:id')
// 	.get(addcon.check_custom)

// router
// 	.route('/receptionist/:id')
// 	.get(addcon.check_recept)
router
	.route('/allocate_custom/:id')
	.get(addcon.customer_allocation)
router
	.route('/test')
	.post(addcon.testc)
router
	.route('/consumptions')
	.get(addcon.consumption2)
module.exports = router;