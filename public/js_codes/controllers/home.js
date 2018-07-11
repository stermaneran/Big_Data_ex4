BDApp.controller('homeController', ['$scope', '$http', 'ProfileService', function ($scope, $http, ProfileService) {

    $scope.entry = {};
    $scope.result = [];

    $scope.func = {};
    $scope.learned = true;
    $scope.predicted = false;
    $scope.nanError = true;
    $scope.prediction = '';

    $scope.learningInProgress = false;
    $scope.predictingInProgress = false;
    $scope.searchingInProgress = false;

    $scope.choices = {};
    $scope.searchFilter = {};


    $scope.datasetOptions = [];
    $scope.datasetHeaders = [];

    $scope.isDatasetOptionsReady = false;
    $scope.isReadyToSearchAndPredict = false;
    $scope.isChosenDataset = false;
    $scope.isChosenLearnBy = false;
    $scope.hasSearched = false;

    $scope.features = [];
    $scope.pred = "";
    $scope.datasetName = "";




    $scope.getAllDatasets = function() {
        ProfileService.getAllDatasets()
            .then(function(data) {
                $scope.datasetOptions = data.data.ans;
                console.log("Got datasets: " + $scope.datasetOptions);
                $scope.isDatasetOptionsReady = true;
            }, function(err) {
                console.log("Error getting datasets");
            });
    };
    $scope.getAllDatasets();





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
        $scope.doneUploading = false;
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
                    $scope.doneUploading = true;
                },
                function () {
                    console.log("error!!");
                });
    };

    $scope.loadCSV = function (filename){
        $scope.doneLoadingCSV = false;
        ProfileService.loadCSV(filename)
            .then(function (data) {
                $scope.doneLoadingCSV = true;
                console.log("The server guy told me: Success loading csv to mongo");
            }, function (err) {
                console.log("Error loading csv to mongo");
            })

    };


    $scope.learnDataset = function (filename){
        $scope.learningInProgress = true;
        ProfileService.learnDataset(filename)
            .then(function (data) {
                console.log("data = " + JSON.stringify(data));

                $scope.learningInProgress = false;
                // $scope.func.m = data.data.m;
                // $scope.func.n = data.data.n;
                //
                // if(data.data.n){
                //     $scope.learned = false;
                //     $scope.nanError=true;
                // }
                // else{
                //     $scope.nanError=false;
                //     $scope.learned = true;
                // }
            }, function (err) {
                $scope.learningInProgress = false;
                console.log("Error loading csv to mongo");
            })

    };

    $scope.predict = function() {
        $scope.predictingInProgress = true;

        console.log("choices = " + JSON.stringify($scope.choices));
        ProfileService.predict($scope.choices, $scope.datasetName)
            .then(function (data) {
                console.log("Perdiction: " + JSON.stringify(data));
                $scope.prediction = data.data.ans;
                $scope.predicted = true;
                $scope.predictingInProgress = false;
            }, function (err) {
                console.log("Error predicting");
                $scope.predictingInProgress = false;

            })
    };



    $scope.search = function() {
        $scope.searchingInProgress = true;

        ProfileService.search($scope.searchFilter, $scope.datasetName)
            .then(function (data) {
                // console.log(JSON.stringify(data.data.ans));
                $scope.result = data.data.ans;
                console.log(JSON.stringify($scope.result));
                $scope.searchingInProgress = false;
                $scope.hasSearched = true;
            }, function(err) {
                $scope.searchingInProgress = false;

            })
    };









    // Choosers

    $scope.learnByChoose = function(input, type) {
        console.log("Called predictChoose with input = " + input + ", type = " + type);
        $('.field-drop').text(input.charAt(0).toUpperCase() + input.slice(1));
        $scope.isChosenLearnBy = true;
        $scope.pred = input;

        for (var i = 0; i < $scope.datasetHeaders.length; ++i) {
            if ($scope.datasetHeaders[i].name !== $scope.pred) {
                $scope.features.push($scope.datasetHeaders[i].name);
            }
        }



        $scope.learningInProgress = true;
        ProfileService.learnDataset($scope.pred, $scope.features, $scope.datasetName)
            .then(function (data) {
                console.log("data = " + JSON.stringify(data));

                $scope.learningInProgress = false;
                $scope.isReadyToSearchAndPredict = true;

            }, function (err) {
                $scope.learningInProgress = false;
                console.log("Error loading csv to mongo");
            })



    };


    $scope.predictChoose = function(input, type) {
        console.log("Called predictChoose with input = " + input + ", type = " + type);
        $('.' + type + '-drop').text(input.charAt(0).toUpperCase() + input.slice(1));
        $scope.choices[type] = input;

    };


    $scope.searchChoose = function(input, type) {
        console.log("Called role choose");
        $('.search-' + type + '-drop').text(input.charAt(0).toUpperCase() + input.slice(1));
        $scope.searchFilter["obj." + type] = input;

    };


    $scope.datasetChoose = function(input) {
        console.log("Called role choose");
        $('.dataset-drop').text(input.charAt(0).toUpperCase() + input.slice(1));

        ProfileService.getDatasetHeaders(input)
            .then(function(data) {
                $scope.datasetHeaders = data.data.ans;
                console.log("Got dataset headers: " + $scope.datasetHeaders);
                for (let i = 0; i < $scope.datasetHeaders.length; ++i) {
                    console.log(JSON.stringify($scope.datasetHeaders[i]))
                }
                // $scope.isReadyToSearchAndPredict = true;
                $scope.isChosenDataset = true;
                $scope.datasetName = input;
            }, function(err) {
                console.log("Errors getting dataset headers");
            })
    };




    // $scope.edChoose = function(input) {
    //     console.log("Called role choose");
    //     $('.ed-drop').text(input.charAt(0).toUpperCase() + input.slice(1));
    //     $scope.choices.education = input;
    // };
    //
    // $scope.placeChoose = function(input) {
    //     console.log("Called role choose");
    //     $('.place-drop').text(input.charAt(0).toUpperCase() + input.slice(1));
    //     $scope.choices.place = input;
    // };



}]);




