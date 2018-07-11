var express = require('express');
var router = express.Router();
const All = require('../schemas/all');


router.get("/search", function (req, res) {

    console.log("searching in " + req.query.name);
    // let match = {"obj.intent" : "Suicide" , "obj.sex" : "F", "obj.place" : "Farm"};
    let match = req.query.match;
    All.aggregate([
        {$match: {name : req.query.name}},
        {$unwind: "$obj"},
        {$match: match},
        {$project: {"_id":0, "name":0, "headers":0, '__v': 0}}
    ], function (err, result) {
            if (err) {
                console.log(err);
                res.status(500).json(err);
            }
            else {
                res.status(200).json({ans: result});
            }

        });
});

router.get("/all",function (req, res) {
    All.find({},{name:1, _id:0},function (err, all) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            res.status(200).json({ans : all});
        }
    })
});

router.get('/headers',function (req, res) {
    All.findOne({name: req.query.name},function (err, all) {
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            res.status(200).json({ans : all.headers});
        }
    });
});



module.exports = router;
