const express = require("express");
const { postLogin } = require("../modules/login");
const { postRegister } = require("../modules/register");
const { postUserData } = require("../modules/ีusers");
const { postQrHistory,getQrHistory } = require("../modules/saveQR");
const { readQrResponse } = require("../modules/checkQrResponse");
//import user controllers for user management
const { user } = require("../controllers/user.controller");
//import qr controllers for CRUD qr code history
const { qrHistoryModel } = require("../controllers/qr.controller");

const router = express.Router();

router.get("/", user.initDB);

//Read the own user data from the user model in the database
router.get("/user", user.getUser);

//Read the data from the user model in the database
router.get("/users", user.getAllUsers);

//Read the data by selecting id
router.get("/user/:id/", user.getSelectedUserById);

//Update the data in the user model in the database
router.put("/user/:id/", user.updateSelectedUser);

//Edit a history that user has generated QR codes
router.put("/user/payment/history/edit", qrHistoryModel.editQrHistoryById);

//Delete a history that user has generated QR codes
router.put("/user/payment/history/delete", qrHistoryModel.deleteQrHistoryById);

// Create a new data in User model
router.post("/user/register", postRegister );

//Check if the user data is already in the database
router.post("/user/login", postLogin);

//Read the data by user 
router.post('/user/:username/', postUserData);

//Keep a history that user has generated QR codes
router.post("/user/payment/history", postQrHistory);

//Read a history that user has generated QR codes
router.post("/user/payment/history/read", getQrHistory);

//Read a history that user has generated QR codes and get a status paid message
router.post("/user/payment/history/check", readQrResponse);

module.exports = router;
