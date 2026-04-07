let fs = require('fs'); //Built in node module that can read and write to files

const FILE_NAME = './assets/pies.json';

let pieRepo = {
    get: function (resolve, reject) {
        FileSystem.readFile(FILE_NAME, function (err, data) {
            if (err) {
                reject(err);
            }
            else {
                resolve(JSON.parse(data));
            }
        });
    }
};

module.exports = pieRepo;