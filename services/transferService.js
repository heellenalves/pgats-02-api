const { transfers } = require('../models/transferModel');
const { users } = require('../models/userModel');

function createTransfer({ from, to, amount }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) throw new Error('Usuário não encontrado');
  if (recipient.isFavorecido || amount < 5000) {
    const transfer = { from, to, amount, date: new Date() };
    transfers.push(transfer);
    return transfer;
  } else {
    throw new Error('Transferência acima de R$ 5.000,00 só para favorecidos');
  }
}

function getTransfers() {
  return transfers;
}

module.exports = {
  createTransfer,
  getTransfers,
};
