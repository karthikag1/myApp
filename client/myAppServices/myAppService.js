angular.module('myApp').factory('myService',function($http) {
	var myService = {
		login:function(loginData,callback){
			$http({method:'POST',
				data:loginData,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/login'})
			.then(function(data){
				callback(data);
			});
		},
		register:function(userData,callback){
			$http({method:'POST',
				data:userData,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/users/users'})
			.then(function(data){
				callback(data);
			});
		},
		getProducts:function(productData,callback){
			$http({method:'GET',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/product/'})
			.then(function(data){
				callback(data);
			});
		},
		getUsers:function(userDetails,callback){
			$http({method:'GET',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/users/'})
			.then(function(data){
				callback(data);
			});
		},
		setUserDetails:function(userid){
			myService.userDetails = userid;
		},
		getUserDetails:function(){
			return myService.userDetails.userid;
		},
		getUserbyId:function(userid,callback){
			$http({method:'GET',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/users/'+ userid})
			.then(function(data){
				callback(data);
			});
		},
		editUserbyId:function(dataToEdit,callback){
			$http({method:'PUT',
				data:dataToEdit.data,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/users/'+ dataToEdit.userid})
			.then(function(data){
				callback(data);
			});
		},
		deleteUser:function(userid,callback){
			$http({method:'DELETE',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/users/'+ userid})
			.then(function(data){
				callback(data);
			});
		},
		setProductDetails:function(product_id){
			myService.productDetails = product_id;
		},
		getProductDetails:function(){
			return myService.productDetails;
		},
		getProductbyId:function(productid,callback){
			$http({method:'GET',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/product/'+ productid})
			.then(function(data){
				callback(data);
			});
		},
		editProductbyId:function(dataToEdit,callback){
			$http({method:'PUT',
				data:dataToEdit.data,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/product/'+ dataToEdit.product_id})
			.then(function(data){
				callback(data);
			});
		},
		deleteProduct:function(productid,callback){
			$http({method:'DELETE',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/product/'+ productid})
			.then(function(data){
				callback(data);
			});
		},
		addStock:function(stockData,callback){
			console.log("stockData",stockData);
			$http({method:'POST',
				data:stockData,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/stock'})
			.then(function(data){
				callback(data);
			});
		},
		getStock:function(stockDetails,callback){
			$http({method:'GET',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/stock/'})
			.then(function(data){
				callback(data);
			});
		},
		deleteStock:function(stockid,callback){
			$http({method:'DELETE',
				data:null,
				headers:{'Content-Type':'application/json'},
				url:'http://localhost:3000/stock/'+ stockid})
			.then(function(data){
				callback(data);
			});
		},
		addCart:function(productid,tokenHeader,callback){
			console.log("productid",productid);
			$http({method:'POST',
				data:productid,
				headers:{'Content-Type':'application/json','Authorization':'Bearer '+tokenHeader},
				url:'http://localhost:3000/cart'})
			.then(function(data){
				callback(data);
			});
		}
	};
	return myService;
});