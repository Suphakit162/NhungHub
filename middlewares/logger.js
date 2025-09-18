// logger ทำหน้าที่สำหรับบันทึก (log) การเรียกใช้งาน API
// จะแสดงข้อมูลทุกครั้งที่มี request เข้ามา
// ก๊อปปี้

// middleware/logger.js
const fs = require('fs');
const path = require('path');

// Log file เก็บไว้ใน /logs/app.log
const logDirectory = path.join(__dirname, '../logs');
if (!fs.existsSync(logDirectory)) {
  fs.mkdirSync(logDirectory);
}
const logFile = path.join(logDirectory, "app.log");

// Logger Middleware
const logger = (req, res, next) => {
    const start = Date.now();
    
    res.on('finish', () => {
        const duration = Date.now() - start;
        const log = `[${new Date().toISOString()}] ${req.method} ${
            req.originalUrl
        }   ${res.statusCode} - ${duration}ms\n`;

        // เขียนลง console
        process.stdout.write(log);

        // append ลงไฟล์
    fs.appendFile(logFile, log, (err) => {
        if (err) {
            console.error("Error writing log:", err.message);
        }
        });
    });

    next();
};

module.exports = logger;