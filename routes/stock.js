
var express = require('express');
var router = express.Router();
var Stock = require('../schema/Stock');
var Product = require('../schema/Product');

/* API to add to stock */
router.post('/', function(req, res, next){

	var newStock = new Stock({
		product_id : req.body.product_id,
		stock : req.body.stock,
		stockEnteredon : new Date()
	});
	newStock.save(function(err){
		if (err) {
			return res.send({
				status : false,
				message : err,
				code : 403
			});
		} else{
			Product.findOne({ _id: req.body.product_id }, function(err, product) {
				if(err) {
					return res.send({
						status : false,
						code : 403,
						message : err
					});
				} else	{
					if(req.body.stock){
						console.log("req.body",req.body.stock);
						product.stock = parseInt(product.stock) + parseInt(req.body.stock);
						console.log("product",product);
					}
					product.save(function(err){
						if(err){
							return res.send({
								status : false,
								code : 403,
								message : err
							});
						} else{
							return res.send({
								status : true,
								code : 200,
								message : 'Stock added successfully'
							});
						}
					});
				}
			});	
		}
	});
});

router.get('/',function(req,res,next) {

	var filter = req.query;
	var query = {};

	if(filter.name) {
		query.name = new RegExp(filter.name,"i");
	}
	Stock.find(query, function(err, stocks) {
		if (err) {
			return resp.send(handleResponse(err.errmsg));
		} else {
			if(!Stock.length) {
				return res.send(handleResponse('Sorry ! we cannot find any stocks'));
			} else {
				return res.send(handleSucess('stocks listed succesfully',stocks));
			}
		}
	});
});

router.delete('/:id',function(req,res,next){
	Stock.findById(req.params.id, function(err, stock) {
		if (err){
			return resp.send(handleResponse(err.errmsg));
		} else{
			if(!stock){
				return res.send(handleResponse('Sorry ! we cannot find any stock'));
			} else {
				stock.remove(function(err,result){
					if (err) {
						return res.send(err.errmsg);
					} else {
						return res.send(handleSucess('Stocks deleted succesfully',stock));
					}
				});
			}
		}
	});
});

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








