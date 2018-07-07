var express = require('express');
var router = express.Router();
var Stat = require("../schemas/stat");


router.get("/get-by-age", function (req, res) {
    var age = req.query.age;
    Stat.find({age: age}, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ans: result});
    });
});

router.get("/get-by-sex", function (req, res) {
    var sex = req.query.sex;
    Stat.find({sex: sex}, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ans: result});
    });
});

router.get("/get-by-range", function (req, res) {
    var min = req.query.min;
    var max = req.query.max;
    Stat.find({age: {$lte:max, $gte:min}}, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ans: result});
    });
});

module.exports = router;
