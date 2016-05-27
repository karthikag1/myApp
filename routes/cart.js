var express = require('express');
var router = express.Router();
var auth = require('../middleware/authentication');

var session = require('express-session');

router.get('/', function (req, res, next) {
  res.send('ss',req.session)
})

router.post('/', auth.secure , function (req,res,next) {
	
	req.session.cart.push(req.body);
	console.log(req.session.cart);

	/*//Load (or initialize) the cart
	req.session.cart = req.session.cart || {};
	var cart = req.session.cart;

	var id = req.body._id;

	//Add or increase the product quantity in the shopping cart.
	if (cart[id]) {
		cart[id].qty++;
	}
	else {
		cart[id] = {
			name: req.body.name,
			price: req.body.price,
			qty: 1
		};
	}

	console.log('cart',cart);*/
	
});

module.exports = router;