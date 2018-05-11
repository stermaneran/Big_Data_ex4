var mongoose = require('mongoose')
    , csv = require('fast-csv');
var MinistatSchema = require('./schemas/minStat');


module.exports.importFile = function(filePath, fileHeaders) {
    csv.fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {
            for(var i =0; i<data.length;i++){
                if(data[i]==='NA'){
                    data[i]=-1;
                }
            }
            var number=data[0],
                year=data[1],
                month=data[2],
                intent=data[3],
                police=data[4],
                sex=data[5],
                age = data[6],
                race=data[7],
                hispanic=data[8],
                place=data[9],
                education=data[10];

            var curr = new MinistatSchema({
                number: number,
                year: year,
                month: month,
                intent:intent,
                police:police,
                sex:sex,
                age:age,
                race:race,
                hispanic:hispanic,
                place:place,
                education:education
            });
            curr.save(function (err, entry) {
                if (err)
                    console.log(err);

                console.log("Success number=" + entry.number);
            });
        })
        .on('end', function() {
            console.log("done");
        });
};