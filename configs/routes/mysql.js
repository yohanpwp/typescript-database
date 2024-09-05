const mysql = require('mysql2');

// Create a new mySQL connection
let db = null;
const initMySQL = async () => {  
    db = mysql.createConnection(
                process.env.DATABASE_URL
                // {user : 'root',
                // password : 'password',
                // database : 'user_test',
                // charset : 'utf8'}
            );
    //เชื่อมต่อฐานข้อมูลกับ node.js
    db.connect((err) => {  if (err) {throw err;  }  console.log("MySql Connected");});
    }

exports.initMySQL = initMySQL;