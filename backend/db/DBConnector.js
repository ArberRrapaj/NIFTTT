const mysql = require('mysql');
require('dotenv').load();

class DBConnector {

    constructor(conLimit, dbhost, dbuser, dbpassword, dbname, dbport) {
        this._connectionPool = mysql.createPool({
            connectionLimit: conLimit,
            host: dbhost,
            user: dbuser,
            password: dbpassword,
            database: dbname,
            port: dbport,
            debug: false
        });
    }

    getConnectionPool() {
        return this._connectionPool;
    }
}

const instance = (function () {
    var dbConnector = new DBConnector(
        process.env.connectionlimit,
        process.env.hostname,
        process.env.mysqluser,
        process.env.mysqlpassword,
        process.env.mysqldatabase,
        parseInt(process.env.mysqlport)
    );
    return dbConnector;
})()
Object.freeze(instance);

module.exports = instance.getConnectionPool();