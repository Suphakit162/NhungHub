const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
     'Nhunghub', // Database name
     'postgres', // Username
     'GGwdst76', // Password
     {
       host: 'localhost', // Connect to your local database
       dialect: 'postgres' // Tell sequelize to use Postgres
     }
   );

async function connect() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully');
  } catch (error) {
    console.error('Unable to connect to the database:', error);
  }
}

module.exports = { sequelize, connect };