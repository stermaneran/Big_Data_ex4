let express = require('express');
let router = express.Router();
const DecisionTree = require('decision-tree');
const All = require('../schemas/all');
const DT = require('../schemas/dt');


router.post("/process", function (req, res) {
    console.log("learning " + req.body.name + ".csv");
    DT.findOneAndRemove({name: req.body.name}, function(err){
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            All.findOne({name: req.body.name}, function (err, all) {
                if (err) {
                    console.log(err);
                    res.status(500).json(err);
                }
                else {

                    let class_name = req.body.pred;
                    let features = req.body.features;
                    let dt = new DecisionTree(all.obj, class_name, features);
                    let tree = new DT({
                        name: req.body.name,
                        data: dt.data,
                        target: dt.target,
                        features: dt.features
                    });
                    tree.save().then(function () {
                        console.log("saved tree for " + req.body.name);
                        res.status(200).json({message: "Success"});
                    });
                }
            });
        }
    });
});


router.post('/predict', function (req, res) {

    console.log("predicting " + req.body.name);

    DT.findOne({name: req.body.name},function (err, tree) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            let dt = new DecisionTree(tree.data, tree.target, tree.features);
            let predicted_class = dt.predict(req.body.pred);
            res.status(200).json({ans: predicted_class});
            console.log("prediction: "+predicted_class);
        }
    });
});


module.exports = router;