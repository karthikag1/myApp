myApp.controller('userListCtrl', function ($scope,$route, myService, $location, $window){

    $scope.userDetails={};
  myService.getUsers($scope.userDetails,function(data){
      $scope.data=data.data.data;
      });

  $scope.addUser = function(){
      $location.url('/newuserRegistration');
  };

  $scope.edit = function(id){
  	$scope.userid = {
  		userid:id
  	};
  	console.log("id",id);
  	if(id){
  		myService.setUserDetails($scope.userid);
  		$location.url('/editUser');
  	} else{
  		$window.alert('parameter id is empty');
  	}
  };

  $scope.delete = function(id){
    myService.deleteUser(id,function(data){
      $scope.data=data.data;
      if($scope.data.status){
        window.alert($scope.data.message);
        // $location.url('/userList');
        $route.reload();
      } else {
        $location.url('/userList');
      }
    });
  };
});

