const { userModel, sequelize } = require("../routes/database");
const { verifyToken } = require("../modules/jwt");

// Connect to the database
const initDB = async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.sync();
    return res.status(200).json({ message: "Hello, World!" });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get the user information
const getUser = async (req, res) => {
  try {
    const userData = await verifyToken(req);
    if (!userData) return res.status(401).json({ message: "Unauthorized" });
    const user = await userModel.findOne({
      where: { username: userData.username, deletedAt: null },
      attributes: {
        exclude: ["deletedAt", "deletedBy", "password", "isAvtive"],
      },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
};

// Get the user information by selecting id
const getSelectedUserById = async (req, res) => {
    try {
      const authToken = await verifyToken(req);
      if (!authToken) return res.status(401).json({ message: "Unauthorized" });
      const userId = req.params.id;
      // แบบ Query แบบเก่า
      // const [result] = await conn.query('SELECT users.*, addresses.address1 FROM users LEFT JOIN addresses on users.id = addresses.userId WHERE users.id = ?', userId)
  
      const result = await userModel.findOne({
        where: { id: userId, deletedAt: null },
        attributes: { exclude: ["deletedAt", "deletedBy"] },
      });
      if (!result) {
        res.status(404).json({ message: "Page Not Found!!!" });
      } else {
        res.status(200).json(result);
      }
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

// Get all users
const getAllUsers = async (req, res) => {
    try {
      const authToken = await verifyToken(req);
      if (!authToken) return res.status(401).json({ message: "Unauthorized" });
      const user = await userModel.findAll({
        where: { deletedAt: null },
        attributes: { exclude: ["deletedAt", "deletedBy","password","isActive"] },
      });
      res.status(200).json(user);
    } catch (err) {
      res.status(500).json({ message: "Internal Server Error" });
    }
  }

  // Update user by selecting id
const updateSelectedUser = async (req, res) => {
    try {
      const data = req.body;
      const userId = req.params.id;
  
      const result = await userModel.update(
        {
          username: data.username, //ปกติ username ไม่ควรเปลี่ยน
          password: data.password,
          firstName: data.firstName,
          lastName: data.lastName,
          isActive: data.isActive,
          updatedBy: data.username,
        },
        {
          where: { id: userId },
        }
      );
      res.status(201).json({
        message: "Update user No." + userId + " was successfully updated",
        result,
      });
    } catch (err) {
      res.status(400).json({ message: "Something went wrong!!" });
    }
  }

exports.user = { initDB, getUser, getAllUsers, getSelectedUserById, updateSelectedUser };
