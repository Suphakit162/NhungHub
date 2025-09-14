const { Sequelize } = require('sequelize');

const sequelize = new Sequelize(
     'nhunghub', // Database name
     'postgres', // Username
     'suphakit25252523', // Password
     {
       host: 'localhost', // Connect to your local database
       dialect: 'postgres' // Tell sequelize to use Postgres
     }
   );

module.exports = sequelize;