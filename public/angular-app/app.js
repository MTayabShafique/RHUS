angular.module('receptionmodule', ['ngRoute'])
.config(function($routeProvider) {
    $routeProvider
    .when("/", {
        templateUrl : "./angular-app/recept.html",
        controller : recController,
        controllerAs : 'vm'
    })
    .when("/update/:id",{
        templateUrl : "./angular-app/update_recept.html",
        controller : updateController,
        controllerAs : 'rec'
    })
    .when("/add_customer",{
        templateUrl : "./angular-app/test.html",
        controller : customController,
        controllerAs : 'cus' 
    })

});

// angular.module('consumpmodule',['ngRoute'])
// .config(function($routeProvider) {
//     $routeProvider
//     .when("/", {
//         templateUrl : "./angular-app/consumpt.html",
//         controller : conController,
//         controllerAs : 'vm'
//     });

// });