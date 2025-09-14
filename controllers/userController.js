
const express = require('express');
const router = express.Router();
const userService = require('../services/userService');
const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

router.post('/register', (req, res) => {
  try {
    const { username, password, isFavorecido } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
    const user = userService.registerUser({ username, password, isFavorecido });
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.post('/login', (req, res) => {
  try {
    const { username, password } = req.body;
    if (!username || !password) return res.status(400).json({ error: 'Informe usuário e senha' });
    const user = userService.loginUser({ username, password });
    // Gera o token JWT
    const token = jwt.sign({ username: user.username }, SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(401).json({ error: err.message });
  }
});

router.get('/', (req, res) => {
  res.json(userService.getUsers());
});

module.exports = router;
