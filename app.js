let express = require('express');
let path = require('path');
let logger = require('morgan');
let mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

let queries = require('./routes/queries');
let uploads = require('./routes/uploadcsv');
let learn = require('./routes/learn');

let app = express();

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


let myLessCompiler = require("./tools/less_compiler");
myLessCompiler();


let mongoDB = 'mongodb+srv://damir:damiri@cluster0-5kimc.mongodb.net/test?retryWrites=true';
mongoose.connect(mongoDB, {
        // useMongoClient: true
    }
);

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error!\n'));

app.get('/', function (req, res) {
    res.sendFile(path.join(__dirname + "/index.html"));
});


app.listen(3000, function () {
    console.log("listening on 3000");
});


// let load_data = require('./load_data');
// let csvheaders = {
//     REGIONS: {
//         headers: ['intent',  'sex', 'place', 'education', 'race']
//     },
//     STATES: {
//         headers: ['String']
//     }
// };
// load_data.importFile("guns4", path.resolve("guns4" + ".csv"), csvheaders);


// let load_data = require('./load_data');
// let csvheaders = {
//     REGIONS: {
//         headers: ["outlook","temp","humidity","wind", "plat"]
//     },
//     STATES: {
//         headers: ['String']
//     }
// };
// load_data.importFile("tennis", path.resolve("tennis" + ".csv"), csvheaders);


var DecisionTree = require('decision-tree');


var training_data1 = [
    {"outlook" : "Sunny", "temp" : "Hot", "humidity" : 'High', "wind": "Weak" , "play": "No"},
    {"outlook" : "Sunny", "temp" : "Hot", "humidity" : 'High', "wind": "Strong" , "play": "No"},
    {"outlook" : "Overcast", "temp" : "Hot", "humidity" : 'High', "wind": "Weak" , "play": "Yes"},
    {"outlook" : "Rain", "temp" : "Mild", "humidity" : 'High', "wind": "Weak" , "play": "Yes"},
    {"outlook" : "Rain", "temp" : "Cool", "humidity" : 'Normal', "wind": "Weak" , "play": "Yes"},
];

var class_name = "play";

var features = ['outlook', 'temp', 'humidity', 'wind'];

var dt = new DecisionTree(training_data1, class_name, features);

var predicted_class = dt.predict({
    outlook : "Sunny",
    temp : "Hot",
    "humidity" : 'High',
    "wind": "Weak"
});

var treeModel = dt.toJSON();

console.log("done");

module.exports = app;
