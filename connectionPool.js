var mysql = require('mysql');
const dbConfig = require('./config/db.config');


var pool = mysql.createPool({
    connectionLimit : 10,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    debug    :  false
});  

// var connection = mysql.createConnection({
//     host: dbConfig.HOST,
//     port: dbConfig.PORT,
//     user: dbConfig.USER,
//     password: dbConfig.PASSWORD,
//     database: dbConfig.DB
// });

module.exports = pool;