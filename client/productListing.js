myApp.controller('productListingCtrl', function ($scope, myService, $window, localStorageService){
    $scope.productData={};
    $scope.productDetails={};
    

  myService.getProducts($scope.productData,function(data){
      $scope.data=data.data.data;
      console.log("$scope.data",$scope.data);
      });

var localStorageData = localStorageService.get('loginInformation');
console.log("localStorageData.token",localStorageData.token);

  $scope.addCart = function(productDetails){
		console.log("productDetails",productDetails);
    	$scope.productDetails=productDetails;
		myService.addCart($scope.productDetails,localStorageData.token,function(data){
      $scope.data=data.data.data;
      console.log("$scope.data",$scope.data);
      });
    };

});

