const express = require('express');
const router = express.Router();
const transferService = require('../services/transferService');

router.post('/', async (req, res) => {
  try {
    const { from, to, amount } = req.body;
    if (!from || !to || typeof amount !== 'number') {
  return res.status(400).json({ error: 'Dados de transferência inválidos.' });
    }
    const transfer = await transferService.createTransfer({ from, to, amount });
    res.status(201).json(transfer);
  } catch (err) {
    // Se for erro customizado do TransferService
    if (err.name === 'TransferError') {
      if (err.type === 'user_not_found') {
  return res.status(400).json({ error: 'Usuário não encontrado.' });
      }
      if (err.type === 'transfer_rule') {
  return res.status(403).json({ error: 'Transferência acima de R$ 5.000,00 só para favorecidos.' });
      }
    }
    // Se for erro genérico (ex: mock nos testes)
    if (typeof err.message === 'string' && err.message.includes('Usuário não encontrado.')) {
      return res.status(400).json({ error: 'Usuário não encontrado.' });
    }
  res.status(500).json({ error: 'Erro interno do servidor.' });
  }
});

router.get('/', (req, res) => {
  res.json(transferService.getTransfers());
});

module.exports = router;
