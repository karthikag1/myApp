var mongoose = require("mongoose");
var Schema = mongoose.Schema;

var stockSchema = new Schema({
	product_id : {
		type : Schema.Types.ObjectId,
		ref : 'products'
	},
	stock : Number,
	stockEnteredon : Date
});

var Stock = mongoose.model('Stock', stockSchema);
module.exports = Stock;
