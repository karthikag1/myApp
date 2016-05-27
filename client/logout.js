myApp.controller('logoutCtrl', function ($scope, myService, $window, $location, localStorageService){
localStorageService.remove('loginInformation');
$location.url('/login');
});

