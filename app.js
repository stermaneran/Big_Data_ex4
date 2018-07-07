var express = require('express');
var path = require('path');
var logger = require('morgan');
var mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

var queries = require('./routes/queries');
var uploads = require('./routes/uploadcsv');
var learn = require('./routes/learn');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/queries', queries);
app.use('/upload', uploads);
app.use('/learn', learn);


var myLessCompiler = require("./tools/less_compiler");
myLessCompiler();


var mongoDB = 'mongodb+srv://damir:damiri@cluster0-5kimc.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB, {
        // useMongoClient: true
    }
);

var db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!\n'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});


app.listen(3000, function () {
    console.log("listening on 3000");
});


//
//hadoop
// const fs = require('fs');
// // var hdfs = new (require("node-webhdfs")).WebHDFSClient({ user: process.env.USER, namenode_host: "localhost", namenode_port: 50070 });
// var WebHDFS = require('webhdfs');
// var hdfs = WebHDFS.createClient();
//
// var localFilePath = "/Users/user/WebstormProjects/Big_Data_ex4/guns2.csv";
// var remoteFilePath = "/user/bigdata/guns.csv";
//
// var localFileStream = fs.createReadStream(localFilePath);
// var remoteFileStream = hdfs.createWriteStream(remoteFilePath);
//
// localFileStream.pipe(remoteFileStream);
//
// console.log("opening stream to HDFS");
//
// remoteFileStream.on('error', function onError(err) {
//     // Do something with the error
//     console.log("it failed");
//     console.log(err);
// });
//
// remoteFileStream.on('finish', function onFinish() {
//     // Upload is done
//     console.log("it is done!");
// });

//


//
// machine learning


// const ml = require('ml-regression');
// const csv = require('csvtojson');
// const SLR = ml.SLR; // Simple Linear Regression
//
// const csvFilePath = 'advertising2.csv'; // Data
// let csvData = [], // parsed Data
//     X = [], // Input
//     y = []; // Output
//
// let regressionModel;
//
// const readline = require('readline'); // For user prompt to allow predictions
//
// const rl = readline.createInterface({
//     input: process.stdin,
//     output: process.stdout
// });
//
//
// csv()
//     .fromFile(csvFilePath)
//     .then(function (jsonObj) { //when parse finished, result will be emitted here.
//         csvData.push(jsonObj);
//         dressData(); // To get data points from JSON Objects
//         performRegression();
//     })
//
// function performRegression() {
//     regressionModel = new SLR(X, y); // Train the model on training data
//     console.log(regressionModel.toString(10));
//     predictOutput();
// }
//
// function dressData() {
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
//     csvData[0].forEach((row) => {
//         X.push(f(row.TV));
//         y.push(f(row.Sales));
//     });
// }
//
// function f(s) {
//     return parseFloat(s);
// }
//
// function predictOutput() {
//     rl.question('Enter input X for prediction (Press CTRL+C to exit) : ', (answer) => {
//         console.log(`At X = ${answer}, y =  ${regressionModel.predict(parseFloat(answer))}`);
//         predictOutput();
//     });
// }

//

module.exports = app;
