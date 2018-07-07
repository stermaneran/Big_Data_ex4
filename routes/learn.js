let express = require('express');
let router = express.Router();
const ml = require('ml-regression');
const csv = require('csvtojson');
const SLR = ml.SLR; // Simple Linear Regression
const mini = require('../schemas/minStat');
// machine learning

router.get("/process", function (req, res) {
    // const csvFilePath = 'advertising.csv'; // Data
    const what = req.query.name; // Data
    let csvData = [], // parsed Data
        X = [], // Input
        y = []; // Output

    mini.find({},function (err, all) {
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            all.forEach(function (entry) {
                csvData.push(entry._doc);
            });
                dressData(what, X, y, csvData); // To get data points from JSON Objects
                let ans = performRegression(X, y);
                res.status(200).json(ans);
        }
    });
});


function performRegression(X, y) {
    let regressionModel;
    regressionModel = new SLR(X, y); // Train the model on training data
    console.log(regressionModel.toString(3));
    var strarr= regressionModel.toString(3).split(' ');
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


module.exports = router;