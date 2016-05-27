// add the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var productSchema = new Schema({
	name : String,
	price : Number,
	description : String,
	image : String,
	category : String ,
	stock : {type : Number, default : 0},
	minimumStock : {type : Number, default : 0},
	featured_product : {type : Boolean, default : false}
},{ versionKey: false });

// create a model using it
var Product = mongoose.model('Product', productSchema);

// make this available to our users in our Node applications
module.exports = Product;