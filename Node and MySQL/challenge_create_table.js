var mysql = require('mysql2'); //Import the mysql2 module to help with database work

//Creates a SQL connection using this login data
var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "[enter password here]",
    database: "mydb"
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
    //Let the sql variable contain sql code that creates a customers table with name, address, and email columns 
    let sql = "CREATE TABLE customers (name VARCHAR(255), address VARCHAR(255), email VARCHAR(255) UNIQUE);";
    //Run the query to create table
    con.query(sql, function (err, result) {
        //Show error or success message
        if (err) throw err;
        console.log("Table created");
    });
});