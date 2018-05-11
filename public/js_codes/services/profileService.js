
wizerApp.service('ProfileService', function($http) {

    this.getByAge = function(age) {
        return $http.get('/queries/get-by-age?age=' + age)
            .then(function (data) {
                 console.log(JSON.stringify(data));
                return data;
            }, function (err) {
                console.log("Error getting by age");
            });

    };




});