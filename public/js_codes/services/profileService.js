wizerApp.service('ProfileService', function ($http) {

    this.getByAge = function (age) {
        return $http.get('/queries/get-by-age?age=' + age)
            .then(function (data) {
                return data;
            }, function (err) {
                console.log("Error getting by age");
            });

    };

    this.getBySex = function (sex) {
        return $http.get('/queries/get-by-sex?sex=' + sex)
            .then(function (data) {
                return data
            })
            .catch(function () {
                console.log("Caught error in get-by-sex");
            });
    };

    this.getByAgeRange = function (min, max) {
        return $http.get('/queries/get-by-range?min=' + min + "&max=" + max)
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in get-by-sex");
            });
    };

});