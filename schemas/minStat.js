var mongoose = require('mongoose');
var MinistatSchema = new mongoose.Schema({
    TV: Number,
    Radio: Number,
    Newspaper: Number,
    Sales: Number
});
module.exports = mongoose.model('Ministats', MinistatSchema);
