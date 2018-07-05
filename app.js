var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

var queries = require('./routes/queries');
var uploads = require('./routes/uploadcsv');
var usersRouter = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/queries', queries);
app.use('/upload', uploads);
// app.use('/users', usersRouter);




var myLessCompiler = require("./tools/less_compiler");
myLessCompiler();



// var mongoDB = 'mongodb+srv://damir:damiri@cluster0-5kimc.mongodb.net/test?retryWrites=true';
var mongoDB = 'mongodb://damir:damiri@cluster0-shard-00-00-00hhm.mongodb.net:27017,cluster0-shard-00-01-00hhm.mongodb.net:27017,cluster0-shard-00-02-00hhm.mongodb.net:27017/test?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin';
mongoose.connect(mongoDB, {
        // useMongoClient: true
    }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!\n'));

app.get('/', function(req, res){
    res.sendFile(path.join(__dirname + "/index.html"));
});

// var load_data = require('./load_data');
// var csvheaders ={
//     REGIONS:{
//        headers: ['number', 'year', 'month', 'intent', 'police', 'sex', 'age', 'race', 'hispanic', 'place', 'education']
//     },
//     STATES:{
//         headers:['String']
//     }
// };
//
//
//  load_data.importFile('guns2.csv', csvheaders);


// uploads all data!!!
//     do not remove
// load_data.importFile('guns.csv', csvheaders, 'Stat');


app.listen(3000,function () {
    console.log("listening on 3000");
});




//
const fs = require('fs');
// var hdfs = new (require("node-webhdfs")).WebHDFSClient({ user: process.env.USER, namenode_host: "localhost", namenode_port: 50070 });
var WebHDFS = require('webhdfs');
var hdfs = WebHDFS.createClient();

var localFilePath = "/Users/user/WebstormProjects/Big_Data_ex4/guns2.csv";
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

//


module.exports = app;
