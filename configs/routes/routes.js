const express = require("express");
const { userModel ,sequelize } = require("./database");
const { postLogin } = require("../modules/login");
const { postRegister } = require("../modules/register");

const router = express.Router();

router.get("/", async (req, res) => {
  try {
    await sequelize.authenticate();
    console.log("Connection has been established successfully.");
    sequelize.sync({});
    return res.status(200).json({ message: "Hello, World!" });
  } catch (error) {
    console.error("Unable to connect to the database:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
});

//Read the data from the user model in the database
router.get("/users", async (req, res) => {
  try {
    const user = await userModel.findAll({
      where: { deletedAt: null },
      attributes: { exclude: ["deletedAt", "deletedBy"] },
    });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ message: "Internal Server Error" });
  }
});

//Read the data by selecting id
router.get("/user/:id/", async (req, res) => {
  try {
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
});

//Update the data in the user model in the database
router.put("/user/:id/", async (req, res) => {
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
});

// Create a new data in User model
router.post("/user/register", async (req, res) => {
  postRegister(req, res);
});

//Check if the user data is already in the database
router.post("/user/login", async (req, res) => {
  postLogin(req, res);
});


module.exports = router;
