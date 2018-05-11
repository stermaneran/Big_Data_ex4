var mongoose = require('mongoose');
var MinistatSchema = new mongoose.Schema({
    number: String,
    year: String,
    month: String,
    intent:String,
    police:Number,
    sex:String,
    age:String,
    race:String,
    hispanic:Number,
    place:String,
    education:String
});
module.exports = mongoose.model('Ministats', MinistatSchema);
