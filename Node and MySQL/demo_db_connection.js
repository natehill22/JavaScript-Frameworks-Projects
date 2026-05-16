var mysql = require('mysql2');

var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "Cheese4me"
});

con.connect(function(err) {
    if (err) {
        console.error("Connection failed details:");
        console.error("Code:", err.code);
        console.error("Message:", err.message);
        return; // Prevent the crash
    }
    console.log("Connected successfully!");
    con.query(sql, function (err, result) {
        if (err) throw err;
        console.log("Result: " + result);
    });
});