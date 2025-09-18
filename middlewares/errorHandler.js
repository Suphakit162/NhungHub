// errorHandler.js ทำหน้าที่จัดการข้อผิดพลาดที่เกิดขึ้นใน express
// ก๊อปปี้

// middlewares/errorHandler.js
const errorHandler = (err, req, res, next) => {
    console.error("ERROR:", err);

    let statusCode = err.status || 500;
    let message = err.message || "Internal Server Error";
    let details = null;

    // จัดการ error ประเภทต่างๆ
    if (err.name === "SyntaxError" && err.status === 400 && "body" in err) {
        statusCode = 400;
        message = "Invalid JSON payload";
    }

    if (err.name === "SequelizeValidationError") {
        statusCode = 400;
        message = "Validation Failed";
        details = err.errors || null;
    }

    if (err.original && err.original.code === "23505") {
        // unique constraint violation ของ Postgres
        statusCode = 409;
        message = "Duplicate value, already exists";
    }

    if (err.code === "ECONNREFUSED") {
        statusCode = 503;
        message = "Database connection refused";
    }

    if (err.code === "ENOTFOUND") {
        statusCode = 503;
        message = "Database host not found";
    }

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