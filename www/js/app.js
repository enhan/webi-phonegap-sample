
console.log("Loading angular App ?");
var webisample = angular.module('webisample', ["ui.router"]);

webisample.config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/login");

    $stateProvider
        .state('login', {
            url: '/login',
            templateUrl: 'html/login.html'
        })
        .state('config', {
            url: '/config',
            templateUrl: 'html/parameters.html',
            controller: 'ConfigCtrl'
        })
        .state('custom', {
            url: '/custom',
            templateUrl: 'html/custom.html',
            controller: 'CustomCtrl'
        });
});