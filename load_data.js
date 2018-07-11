let csv = require('fast-csv');
let All = require('./schemas/all');

module.exports.importFile = function(name, filePath, fileHeaders) {
    let entry = [];
    csv.fromPath(filePath, {headers: fileHeaders})
        .on('data', function(data) {


            let headers = {};
            fileHeaders.REGIONS.headers.forEach(function (head, i) {
                headers[head] = data[i];
            });

            if(headers[fileHeaders.REGIONS.headers[0]] !== fileHeaders.REGIONS.headers[0]){
                entry.push(headers);
            }
        })
        .on('end', function() {
        let newinput = new All({
            obj : entry,
            name : name
            });

        newinput.save()

        });
};