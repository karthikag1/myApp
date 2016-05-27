myApp.controller('editProductCtrl', function ($scope, $routeParams, myService, $location, $window){

    $scope.product_id = myService.getProductDetails();
    myService.getProductbyId($scope.product_id,function(data){
      $scope.data=data.data.data;
    });
    
    $scope.editUser = function(data){
    	$scope.dataToEdit = {
    		product_id : $scope.product_id,
    		data : data
    	};
		myService.editProductbyId($scope.dataToEdit,function(data){
			$scope.data=data.data;
			if($scope.data.status){
				window.alert($scope.data.message);
				$location.url('/adminProductList');
			} else {
				window.alert($scope.data.message);
				$location.url('/adminProductList');
			}
		});
    };

});
