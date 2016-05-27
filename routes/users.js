var express = require('express');
var router = express.Router();
var User = require('../schema/User');

/* Create Users */
router.post('/users', function(req, res, next) {
	var resp;
	if(!req.body.name){
		resp = 'Name parameter cannot be empty'
		handleResponse(resp, res);
	}
	if(!req.body.email){
		resp = 'Email parameter cannot be empty'
		handleResponse(resp, res);
	}
	var email_validate = validateEmail(req.body.email);
	if(!email_validate){
		resp = 'Email format is wrong'
		handleResponse(resp, res);
	}
	var chris = new User({
		name : req.body.name,
		Address : req.body.address,
		email : req.body.email,
		username: req.body.username,
		password: req.body.password
	});
	chris.save(function(err) {
		if (err) {
			return res.send({
				status : false,
				message : err.errmsg,
				code : 403
			});
		}

		res.send({
			status : true,
			message : 'User saved successfully!',
			code : 200
		});
	});
});

router.get('/',function(req,res,next) {

	var filter = req.query;
	var query = {};

	if(filter.name) {
		query.name = new RegExp(filter.name,"i");
	}
	User.find(query, function(err, users) {
		if (err) {
			return resp.send(handleResponse(err.errmsg));
		} else {
			if(!User.length) {
				return res.send(handleResponse('Sorry ! we cannot find any users'));
			} else {
				return res.send(handleSucess('users listed succesfully',users));
			}
		}
	});
});

router.get('/:id',function(req,res,next){
	User.findById(req.params.id, function(err, users) {
		if (err){
			return res.send(handleResponse(err.errmsg));
		} else{
			if(!users){
				return res.send(handleResponse('Sorry ! we cannot find any user'));
			} else {
				return res.send(handleSucess('user listed succesfully',users));
			}
		}
	});
});

router.put('/changePassword/:id', function(req,res,next){
	User.findById(req.params.id, function(err, user){
		if(err){
			return res.send(handleResponse(err.errmsg));
		} else{
			if(user.password === req.body.oldPassword){
				if(!req.body.newPassword){
					return res.send(handleResponse("parameter password cannot be empty"));
				} else{
					if(req.body.newPassword === req.body.confirmPassword){
						user.password = req.body.newPassword;
					}
					user.save(function(err,result){
						if (err) {
							return res.send(err.errmsg);
						} else {
							return res.send(handleSucess('Password changed succesfully',result));
						}
					});
				}
			} else{
				return res.send(handleResponse("incorrect old password"));
			}
		}
	});
});

router.put('/:id', function(req,res,next){
	User.findById(req.params.id, function(err, user) {
		if (err){
			return res.send(handleResponse(err.errmsg));
		} else{
			if(!user){
				return res.send(handleResponse('Sorry ! we cannot find such a user'));
			} else {

				if(req.body.name) {
					user.name = req.body.name;
				}
				if(req.body.email) {
					user.email = req.body.email;
				}
				if(req.body.username) {
					user.username = req.body.username;
				}
				if(req.body.password) {
					user.password = req.body.password;
				}
				user.save(function(err,result){
					if (err) {
						return res.send(err.errmsg);
					} else {
						return res.send(handleSucess('users updated succesfully',result));
					}
				});

			}
		}
	});
});

router.delete('/:id',function(req,res,next){
	User.findById(req.params.id, function(err, user) {
		if (err){
			return res.send(handleResponse(err.errmsg));
		} else{
			if(!user){
				return res.send(handleResponse('Sorry ! we cannot find such a user'));
			} else {
				user.remove(function(err,result){
					if (err) {
						return res.send(err.errmsg);
					} else {
						return res.send(handleSucess('user deleted succesfully',result));
					}
				});
			}
		}
	});
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}
function handleResponse(resp, res) {
	return {
		status : false,
		code : 403,
		message : resp
	};
}

function handleSucess(message,data) {
	var response = {
		status : true,
		code : 200,
		message : message,
		data : data
	};
	return response;
}


module.exports = router;
