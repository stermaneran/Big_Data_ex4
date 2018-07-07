let express = require('express');
let router = express.Router();
const DecisionTree = require('decision-tree');
const Stat = require('../schemas/stat');

// router.get("/process", function (req, res) {
//     // const csvFilePath = 'advertising.csv'; // Data
//     const what = req.query.name; // Data
//     let csvData = [], // parsed Data
//         X = [], // Input
//         y = []; // Output
//
//     Stat.find({},function (err, all) {
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

//
// function performRegression(X, y) {
//     let regressionModel;
//     regressionModel = new SLR(X, y); // Train the model on training data
//     console.log(regressionModel.toString(3));
//     let strarr= regressionModel.toString(3).split(' ');
//     return {m: strarr[2], n:strarr[6]};
// }
//
// function dressData(what, X, y, csvData) {
//     /**
//      * One row of the data object looks like:
//      * {
//      *   TV: "10",
//      *   Radio: "100",
//      *   Newspaper: "20",
//      *   "Sales": "1000"
//      * }
//      *
//      * Hence, while adding the data points,
//      * we need to parse the String value as a Float.
//      */
//     csvData.forEach((row) => {
//         X.push(f(row[what]));
//         y.push(f(row.Sales));
//     });
// }
//
// function f(s) {
//     return parseFloat(s);
// }
//
// router.get('/predict',function (req, res) {
//     let m = parseFloat(req.query.m);
//     let n = parseFloat(req.query.n);
//     let x = parseFloat(req.query.x);
//     let ans = m*x+n;
//     res.status(200).json({ans:ans});
// });


router.post("/predict",function (req, res) {

    Stat.find({},function (err, all) {
        if(err){
            console.log(err);
            res.status(500).json(err);
        }
        else{
            let training_data = [];
            all.forEach(function (entry) {
                training_data.push(entry._doc);
            });
            let class_name = "race";
            let features = ["intent","sex","education","place"];
            let dt = new DecisionTree(training_data, class_name, features);

            let predicted_class = dt.predict({
                intent: req.query.intent,
                sex: req.query.sex,
                education: req.query.education,
                place:req.query.place
            });

            res.status(200).json({ans:predicted_class});
            console.log(predicted_class);
        }
    });
});


module.exports = router;