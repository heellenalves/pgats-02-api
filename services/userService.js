const { users } = require('../models/userModel');

function registerUser({ username, password, isFavorecido }) {
  if (users.find(u => u.username === username)) {
    throw new Error('Usuário já existe');
  }
  const user = { username, password, isFavorecido: !!isFavorecido };
  users.push(user);
  return user;
}

function loginUser({ username, password }) {
  const user = users.find(u => u.username === username && u.password === password);
  if (!user) throw new Error('Credenciais inválidas');
  return user;
}

function getUsers() {
  return users;
}

module.exports = {
  registerUser,
  loginUser,
  getUsers,
};
