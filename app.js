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
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const cors_1 = __importDefault(require("cors"));
const morgan_1 = __importDefault(require("morgan"));
const mysql_1 = require("./configs/routes/mysql");
require('dotenv').config();
const app = (0, express_1.default)();
// ตั้งค่า cors middleware อนุญาต localhost port 5173
const corsOptions = {
    origin: ["http://localhost:5173", "https://verismart-payment.netlify.app"],
    credentials: true,
};
// ใช้ middleware เพื่ออ่านค่าประเภท static และ json
app.use(express_1.default.static(path_1.default.join(__dirname, '/')));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
app.use((0, morgan_1.default)('dev'));
// ใช้ cors middleware เพื่อให้ API สามารถเชื่อมต่อกับหน้าเว็บได้
app.use((0, cors_1.default)(corsOptions));
// ลิงค์แรกเรียกใช้ไฟล์ index.html
app.get('/', (req, res) => {
    res.sendFile(path_1.default.join(__dirname, '/index.html'));
});
// สร้างลิงค์ /api ดึงไฟล์ในโฟลเดอร์เมื่อเรียกใช้งาน
app.use('/api', require('./configs/routes/routes'));
// ใช้งาน port 3000
app.listen(process.env.PORT || 3000, () => __awaiter(void 0, void 0, void 0, function* () {
    yield (0, mysql_1.initMySQL)(); // เรียกใช้��ังก์ชั่นในไ��ล์ database.ts เพื่อเชื่อต่อ��านข้อมูล MySQL
    console.log('App listening on Port 3000');
}));
