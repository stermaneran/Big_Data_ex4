let express = require('express');
let router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const type = upload.single('recfile');
const fs = require('fs');
const path = require('path');

router.post('/post-file', type, function (req, res) {
    if (!req.file) {
        console.log("no file");
        res.status(400).json({message: 'no file'});
    }
    else {
        const filePath = req.file.path;
        if (!req.file.originalname.toLowerCase().match(/\.(csv)$/)) {
            fs.unlinkSync(filePath);
            res.status(400).json({message: 'wrong file'});
        }
        else {
            let pathToFile = path.resolve(filePath);
            let newName = path.resolve('upload');
            fs.rename(pathToFile, newName + "/" + req.file.originalname, function (err) {
                if (err) {
                    console.log('ERROR: ' + err);
                    res.status(400).json({message: 'change name'});
                }
                else {
                    uploadToHDFS(newName + "/" + req.file.originalname, res);
                }
            });

        }
    }
});


var exec = require('child_process').exec;
var child;

function uploadToHDFS(hdfsFile, res) {

    child = exec("$HADOOP_PREFIX/bin/hadoop fs -copyFromLocal " + hdfsFile, function (error) {
        if (error) {
            console.log(error);
        }
            res.status(200).json({message: 'file uploaded'});
        fs.unlinkSync(hdfsFile);
    });
}

let firstline = require('firstline');

let load_data = require('../load_data');
router.get('/load-to-mongo', function (req, res) {

    child = exec("$HADOOP_PREFIX/bin/hadoop fs -copyToLocal " + req.query.name + ".csv" + " mongotmp", function (error) {
        if (error) {
            console.log(error);
        }
            firstline(path.resolve('mongotmp/'+req.query.name + ".csv")).then(function (line) {
                if (line.charAt(line.length - 1) === '\r') {
                    line = line.substring(0, line.length - 1)
                }
                let headers = line.split(",");
                let csvheaders = {
                    REGIONS: {
                        headers: headers
                    },
                    STATES: {
                        headers: ['String']
                    }
                };
                console.log("uploading " + req.query.name + ".csv");
                load_data.importFile(req.query.name, path.resolve('mongotmp/'+req.query.name + ".csv"), csvheaders, res);
            }).catch(function (err) {
                console.log(err.message);
                res.status(404).json({message:" file not found"});
                fs.unlinkSync(path.resolve('mongotmp/'+req.query.name + ".csv"));
            });
    });
});


module.exports = router;