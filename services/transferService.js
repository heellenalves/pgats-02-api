const { transfers } = require('../models/transferModel');
const { users } = require('../models/userModel');

class TransferError extends Error {
  constructor(message, type) {
    super(message);
    this.name = 'TransferError';
    this.type = type;
  }
}

function createTransfer({ from, to, amount }) {
  const sender = users.find(u => u.username === from);
  const recipient = users.find(u => u.username === to);
  if (!sender || !recipient) {
    throw new TransferError('Usuário não não encontrado', 'user_not_found');
  }
  if (recipient.isFavorecido || amount < 5000) {
    const transfer = { from, to, amount, date: new Date() };
    transfers.push(transfer);
    return transfer;
  } else {
    throw new TransferError('Transferência acima de R$ 5.000,00 só para favorecidos', 'transfer_rule');
  }
}

function getTransfers() {
  return transfers;
}

module.exports = {
  createTransfer,
  getTransfers,
};
