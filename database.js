const { Sequelize } = require('sequelize');

// Initialize SQLite database
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite' // Database file
});

module.exports = sequelize;
