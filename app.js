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


let load_data = require('./load_data');
let csvheaders = {
    REGIONS: {
        headers: ["TV","Radio","Newspaper","Sales"]
    },
    STATES: {
        headers: ['String']
    }
};
load_data.importFile("test", path.resolve("test" + ".csv"), csvheaders);

module.exports = app;
