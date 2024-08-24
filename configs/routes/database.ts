import { Sequelize, DataTypes } from "sequelize";

// Connect sequelize to MySQL
export const sequelize = new Sequelize("user_test", "root", "password", {
  host: "127.0.0.1",
  dialect: "mysql",
  dialectOptions: {
    useUTC: false, // for reading from database
    dateStrings: true,
    typeCast: true,
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
