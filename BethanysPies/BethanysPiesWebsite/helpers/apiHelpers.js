const request = require('request'); //Imports request object which helps make simplified HTTP requests

let apiHelper = {
    callApi: function (url) {
        return new Promise((resolve, reject) => {
            request(url, { json: true }, (err, res, body) => { //Automatically parses response body into JS object
                if (err) {
                    reject(err); //If data can't be found, reject callback is triggered
                }
                else {
                    resolve(body); //Returns the body
                }
            });
        })
    }
}

module.exports = apiHelper; //Exports apiHelper JSON to be used in other files