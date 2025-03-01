require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./src/config/db_connection');

// router
const authRouter = require('./src/routes/auth');
const shopRouter = require('./src/routes/shopRoute');

// middleware
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

// Auth router
app.use('/api/auth', authRouter);

// Shop router
app.use('/api/shop', shopRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the shop management system');
})



app.listen(PORT, () => {
    console.log('App is running on port http://localhost:' + PORT);
})