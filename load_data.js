var mongoose = require('mongoose')
    , csv = require('fast-csv');
var Stat = require('./schemas/stat');


module.exports.importFile = function(filePath, fileHeaders) {
    csv.fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {

            var curr = new Stat({
                intent: data[0],
                sex: data[1],
                race: data[4],
                place:data[2],
                education:data[3]
            });
            curr.save(function (err, entry) {
                if (err)
                    console.log(err);
            });
        })
        .on('end', function() {
            console.log("done");
        });
};