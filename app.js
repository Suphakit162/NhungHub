const express = require('express');
const morgan = require('morgan');

const { connect, sync } = require('./config/db');

const movieRoutes = require('./routes/movieRoutes');
const userRoutes = require('./routes/userRoutes');


const app = express();

// Setting up middleware
app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));



// Setting up routes
app.use('/movies', movieRoutes);
app.use('/users', userRoutes);


async function initializeDatabase() {
     await connect();
     await sync();
   }
   initializeDatabase();

// Creating a server
app.listen(3000, () => {
  console.log('Listening on port 3000');
});