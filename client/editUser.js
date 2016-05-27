myApp.controller('editUserCtrl', function ($scope, $routeParams, myService, $location, $window){

    $scope.userid=myService.getUserDetails();
    $routeParams.id = $scope.userid;
    myService.getUserbyId($scope.userid,function(data){
      $scope.data=data.data.data;
    });
    
    $scope.editUser = function(data){
    	$scope.dataToEdit = {
    		userid : $scope.userid,
    		data : data
    	};
		myService.editUserbyId($scope.dataToEdit,function(data){
			$scope.data=data.data;
			if($scope.data.status){
				window.alert($scope.data.message);
				$location.url('/userList');
			} else {
				window.alert($scope.data.message);
				$location.url('/userList');
			}
		});
    };

});
