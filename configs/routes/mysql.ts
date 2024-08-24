import mysql from 'mysql2'

// Create a new mySQL connection
let db:any = null;
export const initMySQL = async () => {  
    db = await mysql.createConnection(
                process.env.DATABASE_URL as string
                // user : 'root',
                // password : 'password',
                // database : 'user_test',
                // charset : 'utf8'
            );
    //เชื่อมต่อฐานข้อมูลกับ node.js
    db.connect((err:any) => {  if (err) {throw err;  }  console.log("MySql Connected");});
    }