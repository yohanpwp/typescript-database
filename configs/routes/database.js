"use strict";
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
// ตั้งค่า environment variable
const env = process.env;
// Connect sequelize to MySQL
exports.sequelize = new sequelize_1.Sequelize(env.TIDB_DB_NAME, env.TIDB_USER, env.TIDB_PASSWORD, {
    host: env.TIDB_HOST,
    port: Number(env.TIDB_PORT),
    dialect: "mysql",
    dialectOptions: {
        useUTC: false, // for reading from database
        dateStrings: true,
        typeCast: true,
        ssl: ((_a = process.env) === null || _a === void 0 ? void 0 : _a.TIDB_ENABLE_SSL) === 'true'
            ? {
                minVersion: 'TLSv1.2',
                rejectUnauthorized: true,
                ca: undefined,
            }
            : null,
    },
    timezone: "+07:00",
});
// สร้างตารางชื่อ Users
const userModel = exports.sequelize.define("Users", {
    // Model attributes are defined here
    username: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
        unique: true,
    },
    password: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    firstName: {
        type: sequelize_1.DataTypes.STRING,
        allowNull: false,
    },
    lastName: {
        type: sequelize_1.DataTypes.STRING,
    },
    isActive: {
        type: sequelize_1.DataTypes.BOOLEAN,
        defaultValue: true,
    },
    createdBy: {
        type: sequelize_1.DataTypes.STRING,
    },
    updatedBy: {
        type: sequelize_1.DataTypes.STRING,
    },
    deletedAt: {
        type: sequelize_1.DataTypes.DATE,
    },
    deletedBy: {
        type: sequelize_1.DataTypes.STRING,
    },
}, {}); //optionsยังว่าง
exports.default = userModel;
