var express = require('express');
var router = express.Router();
var Product = require('../schema/Product');
var auth = require('../middleware/authentication');
var multer  = require('multer');
var crypto = require('crypto');
var path = require('path');


// API
router.post('/', auth.secure , function (req,res,next) {

	if(!req.body.name)
		return res.send( handleResponse('Name parameter cannot be empty') );

	if(!req.body.price)
		return res.send( handleResponse('price parameter cannot be empty') );

	var email_validate = validateEmail(req.body.email);
	if(!req.body.email)
		return res.send( handleResponse('email parameter cannot be empty') );

	if(!req.body.description)
		return res.send( handleResponse('description parameter cannot be empty') );

	if(!req.body.image)
		return res.send( handleResponse('image parameter cannot be empty') );

	if(!req.body.category)
		return res.send( handleResponse('category parameter cannot be empty') );

	var product = new Product({
		name : req.body.name,
		price : req.body.price,
		email : req.body.email,
		description: req.body.description,
		image : req.body.image,
		category : req.body.category
	});

	product.save(function(err) {
		if (err) {
			return res.send(handleResponse(err.errmsg));
		} else {
			return res.send(handleSucess('product saved successfully!'));
		}
	});
});

router.get('/',function(req,res,next) {

	 var fullUrl = req.protocol + '://' + req.get('host');
	var filter = req.query;
	var query = {};

	if(filter.name) {
		query.name = new RegExp(filter.name,"i");
	}
	if(filter.price) {
		query.price = filter.price;
	}
	if(filter.description) {
		query.description = new RegExp(filter.description,"i");
	}
	if(filter.category) {
		query.category = new RegExp(filter.category,"i");
	}
	Product.find(query, function(err, products) {
		if (err) {
			return res.send(handleResponse(err.errmsg));
		} else {
			if(!products.length) {
				return res.send(handleResponse('Sorry ! we cannot find any products'));
			} else {
				products.forEach(function (item) {
				  item.image = fullUrl + '/uploads/' + item.image;
				});
				return res.send(handleSucess('Products listed succesfully',products));

			}
		}
	});
});

router.get('/:id',function(req,res,next){
	Product.findById(req.params.id, function(err, product) {
		if (err){
			return res.send(handleResponse(err.errmsg));
		} else{
			if(!product){
				return res.send(handleResponse('Sorry ! we cannot find any product'));
			} else {
				return res.send(handleSucess('Products listed succesfully',product));
			}
		}
	});
});

router.put('/:id',function(req,res,next){
	Product.findById(req.params.id, function(err, product) {
		if (err){
			return resp.send(handleResponse(err.errmsg));
		} else{
			if(!product){
				return res.send(handleResponse('Sorry ! we cannot find any product'));
			} else {

				if(req.body.name) {
					product.name = req.body.name;
				}
				if(req.body.price) {
					product.price = req.body.price;
				}
				if(req.body.email) {
					product.email = req.body.email;
				}
				if(req.body.description) {
					product.description = req.body.description;
				}
				if(req.body.category) {
					product.category = req.body.category;
				}

				product.save(function(err,result){
					if (err) {
						return res.send(err.errmsg);
					} else {
						return res.send(handleSucess('Products updated succesfully',result));
					}
				});
			}
		}
	});
});

 router.delete('/:id',function(req,res,next){
	Product.findById(req.params.id, function(err, product) {
		if (err){
			return resp.send(handleResponse(err.errmsg));
		} else{
			if(!product){
				return res.send(handleResponse('Sorry ! we cannot find any product'));
			} else {
				product.remove(function(err,result){
					if (err) {
						return res.send(err.errmsg);
					} else {
						return res.send(handleSucess('Products deleted succesfully',result));
					}
				});
			}
		}
	});
});

// var upload = multer({ dest : 'uploads/' });

var storage = multer.diskStorage({
  destination: './uploads/',
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      if (err) return cb(err)

      cb(null, raw.toString('hex') + path.extname(file.originalname))
    })
  }
});

var upload = multer({ storage: storage })

router.post('/upload',upload.single('avatar'),function(req,res,next){
 	if (!req.file) {
 		return res.send(handleResponse("Error occured on image uploading"));
 	} else {
 		Product.findOneAndUpdate({ _id: req.body.product_id }, { image: req.file.filename }, function(err, result) {
			if (err) throw err;
			console.log(req.file);
 			return res.send(handleSucess('Image uploaded successfully'));
		});
 	}
});

function validateEmail(email) {
    var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

function handleResponse(resp, res) {
	return {
		status : false,
		message : resp,
		code : 403
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
