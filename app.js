let express = require('express');
let path = require('path');
let logger = require('morgan');
let mongoose = require('mongoose');
mongoose.Promise = require("bluebird");

let queries = require('./routes/queries');
let uploads = require('./routes/uploadcsv');
let learn = require('./routes/learn');

let app = express();

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({extended: false}));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/queries', queries);
app.use('/upload', uploads);
app.use('/learn', learn);


let myLessCompiler = require("./tools/less_compiler");
myLessCompiler();


let mongoDB = 'mongodb+srv://damir:edseds@cluster0-5kimc.mongodb.net/test?retryWrites=true';
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



module.exports = app;
