let express = require('express');
let router = express.Router();
const multer = require('multer');
const upload = multer({dest: 'upload/'});
const type = upload.single('recfile');
const fs = require('fs');

router.post('/post-file', type, function (req, res) {
    if (!req.file) {
        //
        uploadToHDFS("/Users/user/WebstormProjects/Big_Data_ex4/guns2.csv");
        //
        console.log("no file");
        res.status(400).json({message: 'no file'});
    }
    else {
        const path = req.file.path;
        if (!req.file.originalname.toLowerCase().match(/\.(csv)$/)) {
            fs.unlinkSync(path);
            res.status(400).json({message: 'wrong file'});
        }
        else {
            console.log(path);
            uploadToHDFS(path);
            fs.unlinkSync(path);
        }
    }
});

var hdfs = new (require("node-webhdfs")).WebHDFSClient({
    user: process.env.USER,
    namenode_host: "localhost",
    namenode_port: 50070
});
// var WebHDFS = require('webhdfs');
// var hdfs = WebHDFS.createClient();

function uploadToHDFS(hdfsFile) {
    console.log("here");
    var localFilePath = hdfsFile;
    var remoteFilePath = "/user/bigdata/guns.csv";

    var localFileStream = fs.createReadStream(localFilePath);
    var remoteFileStream = hdfs.createWriteStream(remoteFilePath);

    localFileStream.pipe(remoteFileStream);

    console.log("opening stream to HDFS");

    remoteFileStream.on('error', function onError(err) {
        // Do something with the error
        console.log("it failed");
        console.log(err);
    });

    remoteFileStream.on('finish', function onFinish() {
        // Upload is done
        console.log("it is done!");
    });
}

var load_data = require('../load_data');
router.get('/load-to-mongo', function (req, res) {
    var csvheaders = {
        REGIONS: {
            headers: ["intent","sex","race","place","education"]
        },
        STATES: {
            headers: ['String']
        }
    };
    // load_data.importFile( "advertising" + ".csv", csvheaders);
    load_data.importFile( req.query.name + ".csv", csvheaders);
    res.status(200).json({message:'success'});

});

module.exports = router;