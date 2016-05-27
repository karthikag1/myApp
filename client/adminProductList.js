myApp.controller('adminProductListCtrl', function ($scope, myService, $route, $location, $window){
    myService.getProducts($scope.productData,function(data){
        $scope.data=data.data.data;
    });
    $scope.editProduct = function(product_id){
        $scope.product_id = product_id;
        if(product_id){
            myService.setProductDetails($scope.product_id);
            $location.url('/editProduct');
        } else{
            $window.alert('parameter id is empty');
        }
    };
    $scope.deleteProduct = function(id){
        myService.deleteProduct(id,function(data){
          $scope.data=data.data;
          if($scope.data.status){
            window.alert($scope.data.message);
            $route.reload();
          } else {
            $location.url('/adminProductList');
          }
        });
    };
});
