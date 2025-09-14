const express = require('express');
const router = express.Router();
const transferService = require('../services/transferService');

router.post('/', (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || typeof amount !== 'number') {
      return res.status(400).json({ error: 'Dados de transferência inválidos' });
    }
    const transfer = transferService.createTransfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (err) {
    if (err.name === 'TransferError') {
      if (err.type === 'user_not_found') {
        return res.status(400).json({ error: err.message });
      }
      if (err.type === 'transfer_rule') {
        return res.status(403).json({ error: err.message });
      }
    }
    res.status(500).json({ error: 'Erro interno do servidor' });
  }
});

router.get('/', (req, res) => {
  res.json(transferService.getTransfers());
});

module.exports = router;
