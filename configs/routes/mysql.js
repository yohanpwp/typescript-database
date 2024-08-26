"use strict";
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
exports.initMySQL = void 0;
const mysql2_1 = __importDefault(require("mysql2"));
// Create a new mySQL connection
let db = null;
const initMySQL = () => __awaiter(void 0, void 0, void 0, function* () {
    db = yield mysql2_1.default.createConnection(process.env.DATABASE_URL
    // user : 'root',
    // password : 'password',
    // database : 'user_test',
    // charset : 'utf8'
    );
    //เชื่อมต่อฐานข้อมูลกับ node.js
    db.connect((err) => { if (err) {
        throw err;
    } console.log("MySql Connected"); });
});
exports.initMySQL = initMySQL;
