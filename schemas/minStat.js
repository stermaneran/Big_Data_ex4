var mongoose = require('mongoose');
var MinistatSchema = new mongoose.Schema({
    number: Number,
    year: Number,
    month: Number,
    intent:String,
    police:Number,
    sex:String,
    age:Number,
    race:String,
    hispanic:Number,
    place:String,
    education:Number
});
module.exports = mongoose.model('Ministats', MinistatSchema);
