const express = require('express');
const router = express.Router();
const messageModel = require('../models/message');
const userModel = require('../models/user');

router.post('/', async (req, res) => {
  const { message, room } = req.body;

  try {
    const newMessage = await messageModel.create({ message, room });
    console.log('New Message:', newMessage);
    res.status(201).json({ newMessage });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get('/', async (req, res) => {
  try {
    const messages = await messageModel.find();
    console.log('Messages:', messages);
    res.status(200).json(messages);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
