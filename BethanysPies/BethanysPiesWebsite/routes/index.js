var express = require('express');
var router = express.Router();
const apiHelper = require('../helpers/apiHelpers');

/* GET home page. */
router.get('/', function(req, res, next) {
  apiHelper.callApi('http://localhost:5000/api/') //Get the data from the localhost:5000 location
  .then(response => { //Data gets passed in as the response variable in the then method
    console.log(response);
    res.render('index', 
      { title: "Bethany's Pie Shop", data: response.data });
  })
  .catch(error => {
    res.send(error) //Catch for errors
  });
});


module.exports = router;
