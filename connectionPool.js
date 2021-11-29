var mysql = require('mysql');
const dbConfig = require('./config/db.config');


var pool = mysql.createPool({
    connectionLimit : 100,
    host: dbConfig.HOST,
    port: dbConfig.PORT,
    user: dbConfig.USER,
    password: dbConfig.PASSWORD,
    database: dbConfig.DB,
    debug    :  false
});  

module.exports = pool;