BDApp.service('ProfileService', function ($http) {

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


    this.loadCSV = function (filename) {
        return $http.get('/upload/load-to-mongo?name=' + filename)
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in load-to-mongo");
            });
    };


    this.learnDataset = function (filename) {
        return $http.get('/learn/process?name=' + filename)
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in load-to-mongo");
            });
    };


    this.predict = function (m, n, x) {
        return $http.get('/learn/predict?m=' + m + '&n=' + n + '&x=' + x)
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in predicting");
            });
    };



});