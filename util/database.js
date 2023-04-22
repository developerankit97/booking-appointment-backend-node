const Sequelize = require('sequelize');

const sequelize = new Sequelize('booking-appointments', 'root', 'earth4800', {
    host: 'localhost',
    dialect: 'mysql'
});

module.exports = sequelize;