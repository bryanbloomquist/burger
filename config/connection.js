//  Inside the `connection.js` file, setup the code to connect Node to MySQL.

require("dotenv").config();
var mysql = require("mysql");
var keys = require("../keys.js");

var connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: keys.mySQL.id,
    password: keys.mySQL.secret,
    database: "burgers_db"
});

connection.connect(function(err) {
    if (err) {
        console.error("error connecting: " + err.stack);
        return;
    }
    console.log("connected as id " + connection.threadId);
    });

//  Export the connection.

module.exports = connection;