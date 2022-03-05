const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
  host: 'localhost',
  username: 'postgres',
  password: 'vanilla9',
  database: 'todo-api',
  dialect: 'postgres',
  logging: false
});

module.exports = { sequelize };
