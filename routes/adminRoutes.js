const express = require('express');

const adminController = require('../controllers/adminController');
const router = express.Router();

//นำ Admin controller มาใช้
router.get('/',adminController.getallData);
router.get('/:id',adminController.getOneData);
router.post('/add',adminController.addData);
router.put('/update/:id',adminController.updateData);
router.delete('/delete/:id',adminController.deleteData);

module.exports = router;