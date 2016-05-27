myApp.controller('newuserRegistrationCtrl', function ($scope, myService, $window){
  $scope.register=function(userdata){
    console.log(userdata);
    $scope.userData={
      name : userdata.name,
      Address : userdata.address,
      email : userdata.email,
      username: userdata.username,
      password: userdata.password
    };

  myService.register($scope.userData,function(data){
      $scope.data=data.data;
      console.log($scope.data);
      if($scope.data.status) {
        console.log($scope.data.message);
      } else {
        console.log($scope.data.message);
      }
      });
  };
});

