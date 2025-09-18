const express = require('express');

const adminController = require('../controllers/adminController');
const router = express.Router();

//นำ Admin controller มาใช้
router.get('/Getdata',adminController.getallData);
router.post('/Add',adminController.addData);
router.delete('/delete',adminController.deleteData);

module.exports = router;