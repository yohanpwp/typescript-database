const { Sequelize, DataTypes } = require("sequelize");

// ตั้งค่า environment variable
const env = process.env;

// Connect sequelize to MySQL (Production)
// const sequelize = new Sequelize(env.TIDB_DB_NAME,env.TIDB_USER,env.TIDB_PASSWORD,{
//   host: env.TIDB_HOST,
//   port: Number(env.TIDB_PORT),
//   dialect: "mysql",
//   dialectOptions: {
//     // useUTC: false, // for reading from database
//     dateStrings: true,
//     typeCast: true,
//     ssl:
//         process.env?.TIDB_ENABLE_SSL === 'true'
//           ? {
//               minVersion: 'TLSv1.2',
//               rejectUnauthorized: true,
//               ca: undefined,
//             }
//           : null,
//     },
//     timezone: "+07:00",
//   });

/* Connect sequelize to MySQL (Development)
const sequelize = new Sequelize("user_test", "root", "password", {
  host: "127.0.0.1",
  port: 3306,
  dialect: "mysql",
  dialectOptions: {
    timezone: "+07:00",
  },
}); */

// Connect sequelize to Microsoft SQL Server
const sequelize = new Sequelize(env.MS_NAME,env.MS_USER,env.MS_PASSWORD,{
  host: env.MS_HOST,
  port: Number(env.MS_PORT),
  dialect: "mssql",
  dialectOptions: {
    encrypt: false,
    trustServerCertificate: true,
    // options for authentication
  },
  timezone: "+07:00",
})

// สร้างตารางชื่อ Users
const userModel = sequelize.define(
  "Users",
  {
    // Model attributes are defined here
    username: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    lastName: {
      type: DataTypes.STRING,
    },
    isActive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true,
    },
    createdBy: {
      type: DataTypes.STRING,
    },
    updatedBy: {
      type: DataTypes.STRING,
    },
    deletedAt: {
      type: DataTypes.DATE,
    },
    deletedBy: {
      type: DataTypes.STRING,
    },
  },
  {}
); //optionsยังว่าง

// สร้างตารางชื่อ QRHistory เก็บประวัติการสร้าง Qr code ของแต่ละ user ไว้
const qrHistoryModel = sequelize.define(
  "QrHistoryModels",
  {
    qrType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ppType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ppId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    qrCode: {
      type: DataTypes.TEXT('long'),
      allowNull: false,
    },
    createdBy: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amounts: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ref1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ref2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    ref3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    token: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    customer: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    remark: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    status: {
      type: DataTypes.STRING,
      allowNull: true,
    },
  },
  {}
);

const scbResponse = sequelize.define(
  "scbResponse",
  {
    payeeProxyId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payeeProxyType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payeeAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payeeName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payerAccountNumber: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payerAccountName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    payerName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    sendingBankCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    receivingBankCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    amount: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionId: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionDateandTime: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billPaymentRef1: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billPaymentRef2: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    billPaymentRef3: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    currencyCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    channelCode: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    transactionType: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {}
);

exports.sequelize = sequelize;

exports.userModel = userModel;

exports.qrHistoryModel = qrHistoryModel;

exports.scbResponse = scbResponse;
