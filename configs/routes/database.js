import { Sequelize, DataTypes } from "sequelize";

// ตั้งค่า environment variable
const env = process.env

// Connect sequelize to MySQL
export const sequelize = new Sequelize(env.TIDB_DB_NAME,env.TIDB_USER,env.TIDB_PASSWORD,{
  host: env.TIDB_HOST,
  port: Number(env.TIDB_PORT),
  dialect: "mysql",
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: true,
    ssl:
        process.env?.TIDB_ENABLE_SSL === 'true'
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

export default userModel;
