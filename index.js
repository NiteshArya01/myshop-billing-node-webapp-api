require('dotenv').config();
const express = require('express');
const cors = require('cors');
require('./src/config/db_connection');

// router
const authRouter = require('./src/routes/auth');
const shopRouter = require('./src/routes/shopRoute');
const ledgerRouter = require('./src/routes/ledgerRoute');

// middleware
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 8080;

// Auth router
app.use('/api/auth', authRouter);

// Shop router
app.use('/api/shop', shopRouter);

// Ledger Router
app.use('/api',ledgerRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the shop management system');
})
app.get('/home', (req, res) => {
    res.send('Welcome to the shop management system');
})


app.listen(PORT, () => {
    console.log('App is running on port http://localhost:' + PORT);
})