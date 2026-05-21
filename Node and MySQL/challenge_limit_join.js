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
    //Run the query to limit the number of customer records
    //con.query("SELECT * FROM customers LIMIT 2, 1", function (err, result) { 
    con.query("SELECT customers.name, favefood.FavoriteFood, favefood.FavoriteDrink FROM customers JOIN favefood ON customers.email = favefood.email", function (err, result) { 
        //Show error or success message
        if (err) throw err;
        console.log(result);
    });
});