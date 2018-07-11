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


    // this.learnDataset = function (filename) {
    //     return $http.post('/learn/process?name=' + filename)
    //         .then(function (data) {
    //             return data;
    //         })
    //         .catch(function () {
    //             console.log("Caught error in load-to-mongo");
    //         });
    // };

    this.learnDataset = function (pred, features, name) {
        return $http(
        {
            method: 'POST',
                url: '/learn/process',
            headers : { 'Content-Type' : 'application/json' },
            data: {pred: pred, features: features, name: name}
        })
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in load-to-mongo");
            });
    };



    this.predict = function (choices, name) {
        console.log("in service! choices = " + JSON.stringify(choices));
        return $http({
            method: 'POST',
            url: '/learn/predict',
            headers : { 'Content-Type' : 'application/json' },
            data: {pred: choices, name: name}
        })
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in predicting");
            });
    };



    this.search = function (filters, name) {
        return $http(
            {
                method: 'POST',
                url: '/queries/search',
                headers : { 'Content-Type' : 'application/json' },
                data: {match: filters, name: name}
            })
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in predicting");
            });
    };


    this.getAllDatasets = function() {
        return $http.get('/queries/all')
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in getting datasets");
            });
    }



    this.getDatasetHeaders = function(name) {
        return $http.get('/queries/headers?name=' + name)
            .then(function (data) {
                return data;
            })
            .catch(function () {
                console.log("Caught error in getting dataset headers");
            });
    }


});