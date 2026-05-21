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
    //Let the sql variable contain sql code that adds customers records 
    let sql = "INSERT INTO customers (name, address, email) VALUES ?;";
    let values = [
        ['Junior Johns', '67 14th St.', 'jj@sqwakers.com'],
        ['Kelly Fardberger', '24 Broken Tree Ln.', 'kfard@whackamole.org'],
        ['Franz Finklemaw', '099 W. Mark Rd.', 'franz@finglemeister.com']
    ];
    //Run the query to add records
    con.query(sql, [values], function (err, result) {
        //Show error or success message
        if (err) throw err;
        console.log("Number of records inserted: " + result.affectedRows);
    });
});