var connection = require("../config/connection.js");

function printQuestionMarks(num) {
    var arr = [];
    for (var i=0; i<num; i++) {
        arr.push("?");
    }
    return arr.toString();
}

function objToSql(ob) {
    var arr = [];
    for (var key in ob) {
        var value = ob[key];
        if (Object.hasOwnProperty.call(ob, key)) {
            if (typeof value === "string" && value.indexOf(" ") >=0) {
                value = "'" + value + "'";
            }
            arr.push(key + "=" + value);
        }
    }
    return arr.toString();
}

//  In the `orm.js` file, create the methods that will execute the necessary MySQL commands in the controllers. 
//  These are the methods you will need to use in order to retrieve and store data in your database.
//      `selectAll()`
//      `insertOne()`
//      `updateOne()`

var orm = {
    selectAll: function(table, cb ) {
        var queryString = "SELECT * FROM " + table + ";";
        connection.query(queryString, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    insertOne: function(table, col, vals, cb) {
        var queryString = "INSERT INTO " + table + " (" + col.toString(); + ") VALUES (" + printQuestionMarks( vals.length) + ")";
        console.log(queryString);
        connection.query(queryString, vals, function (err, result) {
            if (err) throw err;
            cb(result);
        });
    },
    updateOne: function(table, colVal, condition, cb) {
        var queryString = "UPDATE " + table + " SET " + objToSql(colVal) + " WHERE " + condition;
        console.log(queryString);
        connection.query(queryString, function(err, result) {
            if (err) throw err;
            cb(result);
        })
    }
};

//  Export the ORM object in `module.exports`.

module.exports = orm;