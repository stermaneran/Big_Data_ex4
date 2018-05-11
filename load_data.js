var mongoose = require('mongoose')
    , csv = require('fast-csv');
var Stats = require('./schemas/stat');


module.exports.importFile = function(filePath, fileHeaders, modelName) {
    csv.fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {

            var array = [number, year, month, intent, police, sex, age, race, hispanic, place, education];

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

            // if(data[6]!="NA") {
            //     var age = data[6];
            // }
            // else{
            //     var age = data[6];
            // }



            // Object.keys(data).forEach(function(key) {
            //     var val = data[key];
            //
            //     if (val !== '')
            //         obj[key] = val;
            // });


            var curr = new Stats({
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
            // console.log(curr);

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