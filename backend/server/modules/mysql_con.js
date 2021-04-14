var mysql = require('mysql');
var con = mysql.createConnection({
    host: "localhost",
    user: "admin",
    password: "admin"
})

exports.mysql_con = function() {
    con.connect(function(err) {
        if (err) {
        throw err;
        }
        console.log('connected');

    });
}
exports.con = con;

