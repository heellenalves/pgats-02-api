const jwt = require('jsonwebtoken');
const SECRET = process.env.JWT_SECRET || 'seuSegredoSuperSeguro';

function getTestToken(username = 'julio') {
  return jwt.sign({ username }, SECRET, { expiresIn: '1h' });
}

module.exports = getTestToken;
