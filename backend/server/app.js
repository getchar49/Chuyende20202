var mysql_con = require('./modules/mysql_con');

mysql_con.mysql_con();

var con = mysql_con.con;
con.query('CREATE DATABASE Chuyende20202;');