myApp.controller('logCtrl', function ($scope, myService, $window, $location, localStorageService){
  $scope.login=function(username,password){
    console.log(username);
    console.log(password);
    $scope.loginData={
      username:username,
      password:password
    };
    myService.login($scope.loginData,function(data){
      $scope.data=data.data;
      if($scope.data.status){
        localStorageService.set('loginInformation', $scope.data.data);
        if($scope.data.data.is_admin){
          $location.url('/userList');
        } else{
          $location.url('/productList');
        }
      } else{
        window.alert($scope.data.message);
      }
    });
  };
});

