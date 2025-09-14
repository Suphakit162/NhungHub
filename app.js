const express = require('express');
const morgan = require('morgan');
const sequelize = require('./config/db'); // นำเข้า sequelize โดยตรง

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');

const app = express();

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

app.use('/movies', movieRoutes);
app.use('/users', userRoutes);

async function initializeDatabase() {
  try {
    await sequelize.authenticate();
    console.log('Connection established successfully');
    await sequelize.sync();
    console.log('Connection synced successfully');
  } catch (err) {
    console.error('Unable to connect to the database:', err);
  }
}
initializeDatabase();

app.listen(3000, () => {
  console.log('Listening on port 3000');
});