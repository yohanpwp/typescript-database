import express from 'express';
import path from 'path';
import cors from 'cors';
import morgan from 'morgan';
import { initMySQL } from './configs/routes/mysql';
require('dotenv').config();

const app = express();

// ตั้งค่า cors middleware อนุญาต localhost port 5173
const corsOptions = {
  origin: ["http://localhost:5173","https://verismart-payment.netlify.app"],
  credentials: true,
};
// ใช้ middleware เพื่ออ่านค่าประเภท static และ json
app.use(express.static(path.join(__dirname,'/')));

app.use(express.json());

app.use(express.urlencoded({ extended : true }));

app.use(morgan('dev'));

// ใช้ cors middleware เพื่อให้ API สามารถเชื่อมต่อกับหน้าเว็บได้
app.use(cors(corsOptions));

// ลิงค์แรกเรียกใช้ไฟล์ index.html

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname,'/index.html'));
});


// สร้างลิงค์ /api ดึงไฟล์ในโฟลเดอร์เมื่อเรียกใช้งาน
app.use('/api', require('./configs/routes/routes'))
// ใช้งาน port 3000
app.listen(process.env.PORT || 3000,async () => {
  await initMySQL();  // เรียกใช้ฟังก์ชั่นในไฟล์ database เพื่อเชื่อต่อฐานข้อมูล MySQL
  console.log('App listening on Port 3000');});