const express = require('express');

const User = require('../models/user');

const router = express.Router();

router.post('/data', async (req, res) => {
  const data = req.body;
  const users = Array.isArray(data)
            ? await User.bulkCreate(data)
            : await User.create(data);
  res.json(users);
});


module.exports = router;