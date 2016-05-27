myApp.controller('stockListCtrl', function ($scope,$route, myService, $location, $window){

    $scope.stockDetails={};

    $scope.stockAdd = function(){
      $location.url('/stock');
    };

myService.getStock($scope.stockDetails,function(data){
  $scope.data=data.data.data;
  console.log("$scope.data",$scope.data);
  console.log("$scope.data",$scope.data.length);
  for(var i=0; i<$scope.data.length;i++){
    $scope.data[i].stockEnteredon = new Date($scope.data[i].stockEnteredon);
    $scope.data[i].stockEnteredon = $scope.data[i].stockEnteredon.getFullYear()+'-' + ($scope.data[i].stockEnteredon.getMonth()+1) + '-'+$scope.data[i].stockEnteredon.getDate();
  }
});

  $scope.delete = function(id){
    console.log("stock id",id);
    myService.deleteStock(id,function(data){
      $scope.data=data.data;
      if($scope.data.status){
        window.alert($scope.data.message);
        $route.reload();
      } else {
        $location.url('/stockList');
      }
    });
  };
});

