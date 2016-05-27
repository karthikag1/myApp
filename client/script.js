
    // create the module and name it scotchApp
    var myApp = angular.module('myApp', ['ngRoute', 'LocalStorageModule']);


    myApp.config(function($routeProvider) {
        $routeProvider

            // route for the home page
            .when('/', {
                templateUrl : 'home.html',
                controller  : 'homeCtrl'
            })

            // route for the login page
            .when('/login', {
                templateUrl : 'login.html',
                controller  : 'logCtrl'
            })

            // route for the user Registration page
            .when('/newuserRegistration', {
                templateUrl : 'newuserRegistration.html',
                controller  : 'newuserRegistrationCtrl'
            })

            // route for the admin home page
            .when('/adminHome', {
                templateUrl : 'adminHome.html',
                controller  : 'adminHomeCtrl'
            })

            // route for the product Listing page
            .when('/productList', {
                templateUrl : 'productList.html',
                controller  : 'productListingCtrl'
            })

            // route for the user Listing page
            .when('/userList', {
                templateUrl : 'userList.html',
                controller  : 'userListCtrl'
            })

            // route for the edit user page
            .when('/editUser', {
                templateUrl : 'editUser.html',
                controller  : 'editUserCtrl'
            })

            // route for the admin product Listing page
            .when('/adminProductList', {
                templateUrl : 'adminProductList.html',
                controller  : 'adminProductListCtrl'
            })

            // route for the admin product Editing page
            .when('/editProduct', {
                templateUrl : 'editProduct.html',
                controller  : 'editProductCtrl'
            })

            // route for the admin to list stock
            .when('/stockList', {
                templateUrl : 'stockList.html',
                controller  : 'stockListCtrl'
            })

            // route for the admin to add stock
            .when('/stock', {
                templateUrl : 'stock.html',
                controller  : 'stockCtrl'
            })

            // route for the admin to logout
            .when('/logout', {
                templateUrl : 'logout.html',
                controller  : 'logoutCtrl'
            });
    });
