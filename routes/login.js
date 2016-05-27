var express = require('express');
var router = express.Router();

var User = require('../schema/User');

var jwt = require('jsonwebtoken');


/* Login Api*/
router.post('/', function(req, res, next){


	User.findOne({$and:[{ username: req.body.username },{password: req.body.password}]}, function(err, user) {


		if (err) throw err;
		// object of the user
		if(!user){
			return res.send({
				status : false,
				message : 'invalid user',
				code : 403
			});
		}
		// res.send(user);
		var token = jwt.sign({ 
			id : user._id,
			name : user.name,
			email : user.email
		}, 'karthika');

		return res.send({
				status : true,
				code : 200,
				message : 'logged in successfully',
				data:{
					token : token,
					id : user._id,
					name : user.name,
					is_admin : user.is_admin
				}
			});
	});
});

module.exports = router;
