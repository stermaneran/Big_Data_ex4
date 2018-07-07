let express = require('express');
let router = express.Router();
const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression
const mini = require('../schemas/minStat');
// machine learning

// router.get("/process", function (req, res) {
//     // const csvFilePath = 'advertising.csv'; // Data
//     const what = req.query.name; // Data
//     let csvData = [], // parsed Data
//         X = [], // Input
//         y = []; // Output
//
//     mini.find({},function (err, all) {
//         if(err){
//             console.log(err);
//             res.status(500).json(err);
//         }
//         else{
//             all.forEach(function (entry) {
//                 csvData.push(entry._doc);
//             });
//                 dressData(what, X, y, csvData); // To get data points from JSON Objects
//                 let ans = performRegression(X, y);
//                 res.status(200).json(ans);
//         }
//     });
// });


function performRegression(X, y) {
    let regressionModel;
    regressionModel = new SLR(X, y); // Train the model on training data
    console.log(regressionModel.toString(3));
    let strarr= regressionModel.toString(3).split(' ');
    return {m: strarr[2], n:strarr[6]};
}

function dressData(what, X, y, csvData) {
    /**
     * One row of the data object looks like:
     * {
     *   TV: "10",
     *   Radio: "100",
     *   Newspaper: "20",
     *   "Sales": "1000"
     * }
     *
     * Hence, while adding the data points,
     * we need to parse the String value as a Float.
     */
    csvData.forEach((row) => {
        X.push(f(row[what]));
        y.push(f(row.Sales));
    });
}

function f(s) {
    return parseFloat(s);
}

router.get('/predict',function (req, res) {
    let m = parseFloat(req.query.m);
    let n = parseFloat(req.query.n);
    let x = parseFloat(req.query.x);
    let ans = m*x+n;
    res.status(200).json({ans:ans});
});



const DecisionTree = require('decision-tree');
router.get("/process",function (req, res) {

    mini.find({},function (err, all) {
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            let training_data = [];
            all.forEach(function (entry) {
                training_data.push(entry._doc);
            });
            let class_name = "Sales";
            // let features = ["intent","sex","race","place","education"]
            let features = ["intent", "Radio", "Newspaper"];
            let dt = new DecisionTree(training_data, class_name, features);

            let predicted_class = dt.predict({
                TV: 4,
                Radio: 3,
                Newspaper: 1001
            });
            // sales = 22.1

            console.log(predicted_class);

            let accuracy = dt.evaluate(training_data);

            console.log(accuracy);


            let treeModel = dt.toJSON();

            console.log(treeModel);

            res.status(200).json(ans);
        }
    });


    // var test_data = [
    //     {"color":"blue", "shape":"hexagon", "liked":false},
    //     {"color":"red", "shape":"hexagon", "liked":false},
    //     {"color":"yellow", "shape":"hexagon", "liked":true},
    //     {"color":"yellow", "shape":"circle", "liked":true}
    // ];

});


module.exports = router;