myApp.controller('stockCtrl', function ($scope, myService, $window, $location, $route){
    $scope.stockData={};
    myService.getProducts($scope.productData,function(data){
        $scope.data=data.data.data;
    });
	$scope.addStock = function(stkdata){
		$scope.stockData={
			product_id : stkdata.product_id,
			stock : stkdata.stock,
			stockEnteredon : stkdata.stockEnteredon
		};
		myService.addStock($scope.stockData,function(data){
			$scope.data=data.data;
			if($scope.data.status){
				$route.reload();
			}
		});
	};
});

