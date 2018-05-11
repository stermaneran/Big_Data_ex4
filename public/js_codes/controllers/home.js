wizerApp.controller('homeController', ['$scope', '$http', 'ProfileService', function ($scope, $http, ProfileService) {

    $scope.entry = {};


    $scope.searchByAge = function() {
        ProfileService.getByAge($scope.entry.age)
            .then(function (data) {
                console.log(JSON.stringify(data));
            });
    };


    $scope.searchByGender = function() {
        $http.get('/queries/get-by-sex?gender=' + $scope.entry.gender)
            .then(function (data) {
                console.log(JSON.stringify(data))
            })
            .catch(function () {
                console.log("Caught error in get-by-age");
            });
    };


}]);




