const express = require('express');
const router = express.Router();
const Blog = require('../models/Blog');

router.post('/create', async (req, res) => {
  try {
    console.log('Received request body:', req.body); 
    const result = await Blog.create(req.body);
    res.status(201).json(result);
  } catch (error) {
    console.error('Route error:', error);
    res.status(500).json({ error: error.message });
  }
});

router.get('/history/:userId', async (req, res) => {
  try {
    const history = await Blog.getByUserId(req.params.userId);
    res.json(history);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;