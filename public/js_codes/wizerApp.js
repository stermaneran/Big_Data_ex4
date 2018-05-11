var wizerApp = angular.module('wizerApp', ['ngRoute', 'btford.socket-io']);

wizerApp.config(function ($routeProvider, $locationProvider) {
    $locationProvider.html5Mode({ enabled: true, requireBase: false }).hashPrefix('!');

    $routeProvider

        .when('/', {
            templateUrl: '../pages/home.html',
            controller: 'homeController'
        })

    .otherwise({ redirectTo: '/'});


});





wizerApp.factory('AuthInterceptor', function ($window, $q) {
    return {
        request: function(config) {
            config.headers = config.headers || {};
            if ($window.localStorage.getItem('token')) {
                config.headers['x-access-token'] = $window.localStorage.getItem('token');
            }
            return config || $q.when(config);
        },
        response: function(response) {
            if (response.status === 401) {
                //  Redirect loggedUser to login page / signup Page.
            }
            return response || $q.when(response);
        }
    };


});


wizerApp.config(function ($httpProvider) {
    $httpProvider.interceptors.push('AuthInterceptor');
});



