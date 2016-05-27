
var jwt = require('jsonwebtoken');
var User = require('../schema/User');

module.exports.secure = function (req,res,next){

	var bearerToken = req.headers['authorization'];
	var message;

	if(!bearerToken) {
		message = 'token is empty';
		return res.send(handleErrorRespone(message));
	}

	var token = bearerToken.split(' ')[1]; 
	message = 'Invalid User'

	// verify a token symmetric
	jwt.verify(token, 'karthika', function(err, decoded) {
		if(err) {
			return res.send(handleErrorRespone(message));
		} else {
			User.findOne({_id : decoded.id}, function(err, user){
				if(err) {
					return res.send(handleErrorRespone(message));
				} else {
					if(!user){
						return res.send(handleErrorRespone(message));
					} else {
						req.decoded = decoded;
						next();
					}
				}	
			});
		}
	});

	function handleErrorRespone(message) {
		var response = {
			status : false,
			code : 403,
			message : message
		}
		return response;
	}
}
