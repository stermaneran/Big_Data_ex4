let csv = require('fast-csv');
let All = require('./schemas/all');

module.exports.importFile = function(name, filePath, fileHeaders) {
    let entry = [];
    let drop = [];
    All.findOne({name: name}, function(err, kayum){
        if (err) {
            console.log(err);
            res.status(500).json(err);
        }
        else {
            if (!kayum) {
                csv.fromPath(filePath, {headers: fileHeaders})
                    .on('data', function (data) {


                        let headers = {};
                        fileHeaders.REGIONS.headers.forEach(function (head, i) {
                            headers[head] = data[i];
                            if (drop[i]) {
                                if (!drop[i]["ops"]) {
                                    drop[i]["ops"] = [];
                                }
                                if (!drop[i]["ops"].includes(data[i])) {
                                    drop[i]["ops"].push(data[i]);
                                }
                            }
                        });

                        if (headers[fileHeaders.REGIONS.headers[0]] !== fileHeaders.REGIONS.headers[0]) {
                            entry.push(headers);
                        }
                        else {
                            fileHeaders.REGIONS.headers.forEach(function (head, i) {
                                let obj = {};
                                obj["name"] = data[i];
                                drop.push(obj);
                            });
                        }

                    })
                    .on('end', function () {
                        let newinput = new All({
                            obj: entry,
                            name: name,
                            headers: drop
                        });

                        newinput.save().then(function () {
                            console.log("saved " + name + " to DB");
                            res.status(200).json({message: 'success'});
                        })
                    });
            }
            else{
                console.log(name + " already in  DB");
                res.status(200).json({message: 'success'});
            }
        }
        });
};