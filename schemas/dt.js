var mongoose = require('mongoose');
var DT = new mongoose.Schema({
    data: [],
    target: String,
    features:[],
    name:String
});
module.exports = mongoose.model('DT', DT);