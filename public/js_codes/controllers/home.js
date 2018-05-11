wizerApp.controller('homeController', ['$scope', '$http', 'ProfileService', function ($scope, $http, ProfileService) {

    $scope.entry = {};
    $scope.result = [];

    $scope.searchByAge = function() {
        ProfileService.getByAge($scope.entry.age)
            .then(function (data) {
                console.log(JSON.stringify(data));
                $scope.result = data.data.ans;
            });
    };


    $scope.searchBySex = function() {
        ProfileService.getBySex($scope.entry.sex)
            .then(function (data) {
                // console.log(JSON.stringify(data.data.ans));
                $scope.result = data.data.ans;
                // console.log($scope.result);
            })
    };


    $scope.searchAgeRange = function() {
        ProfileService.getByAgeRange($scope.entry.minage, $scope.entry.maxage)
            .then(function (data) {
                // console.log(JSON.stringify(data.data.ans));
                $scope.result = data.data.ans;
                // console.log($scope.result);
            })
    }





}]);




