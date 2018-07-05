BDApp.controller('homeController', ['$scope', '$http', 'ProfileService', function ($scope, $http, ProfileService) {

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
    };



    $scope.uploadFile = function () {

        var file = $scope.myFile;
        console.log("MYFILE = " + $scope.myFile);
        var uploadUrl = "/upload/post-file";
        var fd = new FormData();
        fd.append('recfile', file);

        $http.post(uploadUrl, fd, {
            transformRequest: angular.identity,
            headers: {'Content-Type': undefined}
        })
            .then(function (data) {
                    console.log("upload success!!!");
                },
                function () {
                    console.log("error!!");
                });
    };




}]);




