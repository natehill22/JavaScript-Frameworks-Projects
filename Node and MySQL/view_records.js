const mysql = require('mysql2'); //Import the mysql2 module to help with database work

//Creates a SQL connection using this login data
var con = mysql.createConnection({
    host: 'localhost',
    user: 'root',
    password: '[enter password here]',
    database: 'mydb'
  });

con.connect(function(err) {
    //Using login data, print specific errors if encountered
    if (err) {
        console.error("Connection failed details:");
        console.error("Code:", err.code);
        console.error("Message:", err.message);
        return; //Prevent the crash
    }
    //Print success message
    console.log("Connected!");
    //Run the query to views customers records 
    con.query("SELECT * FROM customers", function (err, result, fields) {
        //Show error or success message
        if (err) throw err;
        console.log(result);
    });
});