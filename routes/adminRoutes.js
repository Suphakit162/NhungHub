const express = require('express');

const { Admins } = require('../models');

const router = express.Router();

//มาร์ค 
//นำข้อมูลรูปแบบ JSON มาเพิ่มในตาราง Admins
router.post('/data', async (req, res) => {
    const data = req.body;
    const admins = Array.isArray(data)
                    ? await Admins.bulkCreate(data)
                    : await Admins.create(data);
    res.json(admins);
});

module.exports = router;