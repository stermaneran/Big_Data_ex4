var express = require('express');
var router = express.Router();
var miniStat = require("../schemas/minStat");


router.get("/get-by-age", function (req, res) {
    var age = req.query.age;
    miniStat.find({age: age}, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ans: result});
    });
});

router.get("/get-by-sex", function (req, res) {
    var sex = req.query.sex;
    miniStat.find({sex: sex}, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ans: result});
    });
});

router.get("/get-by-sex-age", function (req, res) {
    var sex = req.query.sex;
    var age = req.query.age;
    miniStat.find({
        sex:sex,
        $or:[
            {age:age},
            {age:30}
        ]
    }, function (err, result) {
        if (err) throw err;
        console.log(result);
        res.status(200).json({ans: result});
    });
});

module.exports = router;
