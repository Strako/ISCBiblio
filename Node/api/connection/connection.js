const mysql = require('mysql');
const mysqlConnection = mysql.createConnection(
{
host:'localhost',
user: 'root',
password: 'Your own password',
database: 'ISCBiblio',
port: '3306'
});

mysqlConnection.connect(error => {
    if(!error){
        return console.log("Connection successfull to database");
    }else{
        return console.log("Error while connecting to db: ",error);
    }
});

module.exports = mysqlConnection;
