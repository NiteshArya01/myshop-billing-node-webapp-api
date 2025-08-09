// require('dotenv').config();
const mongoose = require('mongoose');

const connectionOptions = {
    dbName: process.env.DB_NAME,
    // useNewUrlParser: true,
    // useUnifiedTopology: true,
};

const connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=MYSHOP`;

mongoose.connect(connectionUri, connectionOptions).then(response => {
    console.log("Database connected successfully");
}).catch(error => {
    console.log(error);
    console.log("Database not connected");
});

module.exports = mongoose;