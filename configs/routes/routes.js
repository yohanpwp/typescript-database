"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const database_1 = __importStar(require("./database"));
const login_1 = require("../modules/login");
const register_1 = require("../modules/register");
const router = express_1.default.Router();
router.get("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield database_1.sequelize.authenticate();
        console.log("Connection has been established successfully.");
        database_1.sequelize.sync({});
        return res.status(200).json({ message: "Hello, World!" });
    }
    catch (error) {
        console.error("Unable to connect to the database:", error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
}));
//Read the data from the user model in the database
router.get("/users", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield database_1.default.findAll({
            where: { deletedAt: null },
            attributes: { exclude: ["deletedAt", "deletedBy"] },
        });
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
//Read the data by selecting id
router.get("/user/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const userId = req.params.id;
        // แบบ Query แบบเก่า
        // const [result] = await conn.query('SELECT users.*, addresses.address1 FROM users LEFT JOIN addresses on users.id = addresses.userId WHERE users.id = ?', userId)
        const result = yield database_1.default.findOne({
            where: { id: userId, deletedAt: null },
            attributes: { exclude: ["deletedAt", "deletedBy"] },
        });
        if (!result) {
            res.status(404).json({ message: "Page Not Found!!!" });
        }
        else {
            res.status(200).json(result);
        }
    }
    catch (err) {
        res.status(500).json({ message: "Internal Server Error" });
    }
}));
//Update the data in the user model in the database
router.put("/user/:id/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const data = req.body;
        const userId = req.params.id;
        const result = yield database_1.default.update({
            username: data.username, //ปกติ username ไม่ควรเปลี่ยน
            password: data.password,
            firstName: data.firstName,
            lastName: data.lastName,
            isActive: data.isActive,
            updatedBy: data.username,
        }, {
            where: { id: userId },
        });
        res.status(201).json({
            message: "Update user No." + userId + " was successfully updated",
            result,
        });
    }
    catch (err) {
        res.status(400).json({ message: "Something went wrong!!" });
    }
}));
// Create a new data in User model
router.post("/user/register", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, register_1.postRegister)(req, res);
}));
//Check if the user data is already in the database
router.post("/user/login", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    (0, login_1.postLogin)(req, res);
}));
module.exports = router;
