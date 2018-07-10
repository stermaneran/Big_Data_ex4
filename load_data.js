let mongoose = require('mongoose');
let csv = require('fast-csv');
let Stat = require('./schemas/stat');

let saved = 0;
module.exports.importFile = function(filePath, fileHeaders) {
    csv.fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {


            let curr = new Stat({
                intent: data[0],
                sex: data[1],
                race: data[4],
                place:data[2],
                education:data[3]
            });
            curr.save(function (err) {
                if (err)
                    console.log(err);
            });
        })
        .on('end', function() {
            console.log("done " +saved);
            saved +=1;
            if(saved===3999){
                console.log("all done");
                fs.unlinkSync(filePath);
            }
        });
};