const sql = require('mssql')
// ตั้งค่า environment variable
const env = process.env;

const initMsSQL = async () => {
    try {
        // make sure that any items are correctly URL encoded in the connection string
        await sql.connect({
          user: env.MS_USER,
          password: env.MS_PASSWORD,
          database: env.MS_NAME,
          server: env.MS_HOST,
          port : Number(env.MS_PORT),
          pool: {
            max: 10,
            min: 0,
            idleTimeoutMillis: 30000
          },
          options: {
            encrypt: false, 
            trustServerCertificate: true // change to true for local dev / self-signed certs
          }
        })
        console.log("Sql Server Connected");
    } catch (err) {
        console.error('Error connecting to SQL Server', err)
        // ... error checks
    }
}

exports.initMsSQL = initMsSQL