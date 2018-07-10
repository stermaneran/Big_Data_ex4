var mongoose = require('mongoose');
var AllSchema = new mongoose.Schema({
    obj : {},
    name: String
});
module.exports = mongoose.model('All', AllSchema);
