// errorHandler.js ทำหน้าที่จัดการข้อผิดพลาดที่เกิดขึ้นใน express
// ก๊อปปี้

// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);

    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
    let details = null;

    // จัดการ error ประเภทต่างๆ
    // ข้อมูลไม่ใช่รูปแบบ JSON ที่ถูกต้อง
    if (err.name === "SyntaxError" && err.status === 400 && "body" in err) {
        statusCode = 400;
        message = "Invalid JSON payload";
    }

    // ข้อมูลไม่ผ่าน Sequelize
    if (err.name === "SequelizeValidationError") {
        statusCode = 400;
        message = "Validation Failed";
        details = err.errors || null;
    }

    // ข้อมูลซ้ำ
    if (err.original && err.original.code === "23505") {
        // unique constraint violation ของ Postgres
        statusCode = 409;   // Conflict
        message = "Duplicate value, already exists";
    }

    // เชื่อมต่อ DB ไม่ได้
    if (err.code === "ECONNREFUSED") {
        statusCode = 503;
        message = "Database connection refused";
    }

    // หา host DB ไม่เจอ
    if (err.code === "ENOTFOUND") {
        statusCode = 503;
        message = "Database host not found";
    }

    // ข้อมูลที่ส่งมาไม่ถูกต้อง
    if (err.type === "entity.parse.failed") {
        statusCode = 400;
        message = "Malformed request body";
    }

    // สำหรับ route ที่หาไม่เจอ
    if (err.statusCode === 404) {
        message = "Resource not found";
    }

    // Response JSON
    res.status(statusCode).json({
        success: false,
        error: {
        message,
        details,
        },
    });
};

module.exports = errorHandler;