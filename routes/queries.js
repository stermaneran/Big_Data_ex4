var express = require('express');
var router = express.Router();
var Stat = require("../schemas/stat");
const All = require('../schemas/all');


router.get("/search", function (req, res) {

    console.log("searching...");
    let intent = req.query.intent;
    let sex = req.query.sex;
    let race = req.query.race;
    let place = req.query.place;
    let education = req.query.education;

    let query  = {};

    if(intent !== "undefined"){
        query["intent"] = intent
    }
    if(sex !== "undefined"){
        query["sex"] = sex
    }
    if(race !== "undefined"){
        query["race"] = race
    }
    if(place !== "undefined"){
        query["place"] = place
    }
    if(education !== "undefined"){
        query["education"] = education
    }

    Stat.find(query, function (err, result) {
        if (err) throw err;
        res.status(200).json({ans: result});
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
