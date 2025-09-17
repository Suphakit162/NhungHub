// ก๊อปปี้
const express = require('express');
const router = express.Router();
const streamController = require('../controllers/streamController');

// POST /stream/start → ขอ URL สำหรับเริ่มสตรีม
router.post('/start', streamController.startStream);

// POST /stream/progress → บันทึก progress
router.post('/progress', streamController.saveProgress);

// GET /stream/continue → ดึง continue watching
router.get('/continue', streamController.getContinueWatching);

module.exports = router;