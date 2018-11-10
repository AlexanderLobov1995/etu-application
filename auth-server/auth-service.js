const database = require('./user-database');

function login(username, password) {
  return database.find((user) => user.username === username && user.password === password);
}

module.exports.login = login;
