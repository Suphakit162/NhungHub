const express = require('express');
const morgan = require('morgan');
const sequelize = require('./config/db'); 
const session = require('express-session');

// routes
const movieRoutes = require('./routes/movieRoutes');
const authRoutes = require("./routes/auth.routes");
const userRoutes = require("./routes/user.routes");
const adminRoutes = require('./routes/adminRoutes');

// Middlewares
const logger = require('./middlewares/logger');
const errorHandler = require('./middlewares/errorHandler');

// Initialize express app
const app = express();

app.use(session({
  secret: "supersecret",       // แนะนำใช้ process.env.JWT_SECRET
  resave: false,
  saveUninitialized: false,
  cookie: { secure: false }    // ถ้าใช้ https ค่อยเปลี่ยนเป็น true
}));

app.use(morgan('tiny')); // Log แบบง่าย
app.use(logger);
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Routes
app.use("/auth", authRoutes);
app.use("/users", userRoutes);
app.use('/movies', movieRoutes);
app.use("/admin", adminRoutes);

// Error handler 
app.use(errorHandler);

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