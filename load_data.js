var mongoose = require('mongoose')
    , csv = require('fast-csv');
var MinistatSchema = require('./schemas/minStat');


module.exports.importFile = function(filePath, fileHeaders) {
    csv.fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {

            var TV=data[1],
                Radio=data[2],
                Newspaper=data[3],
                Sales=data[4];

            var curr = new MinistatSchema({
                TV: TV,
                Radio: Radio,
                Newspaper: Newspaper,
                Sales:Sales
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