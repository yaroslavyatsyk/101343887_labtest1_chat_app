const express = require('express');
const router = express.Router();
const crypto = require('crypto');
const userModel = require('../models/user');

router.post('/register', async (req, res) => {
    const { username, password } = req.body;
    try {
        const createdUser = await userModel.create({ username, password });
        console.log(createdUser);
        res.status(201).json(createdUser);
    } catch (error) {
        res.status(500).json({ error });
    }
});


router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    try {
        let token = crypto.randomBytes(48).toString('hex');
        const foundUser = await userModel.findOneAndUpdate({ username, password }, { token: token }, { new: true });
        console.log(foundUser);
        if (foundUser) {
            res.status(200).json({
                status: 'success',
                user: foundUser
            });
        } else {
            res.status(400).json({
                status: 'error',
                message: 'Invalid username or password'
            });
        }
    } catch (error) {
        res.status(500).json({
            status: 'error',
            message: error.message
        });
    }
});


router.post('/user_rooms', async (req, res) => {
    const { token } = req.body;
  
    try {
      const user = await userModel.findOne({ token });
      console.log(user);
      res.status(200).json(user);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  

  router.post('/add_rooms', async (req, res) => {
    const { token, room } = req.body;
  
    try {
      const updatedUser = await userModel.findOneAndUpdate({ token }, { $push: { room } }, { new: true });
      console.log(updatedUser);
      res.status(200).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


  router.post('/log-out', async (req, res) => {
    const { token } = req.body;
  
    try {
      const updatedUser = await userModel.findOneAndUpdate({ token }, { token: null }, { new: true });
      console.log(updatedUser);
      res.status(201).json(updatedUser);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  });
  


module.exports = router;