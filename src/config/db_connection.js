// require('dotenv').config();
const mongoose = require('mongoose');

const connectionpOptions = {
    dbName: process.env.DB_NAME,
    //useNewUrlParser: true,
    //useUnifiedTopology: true,
  }
//   const connectionUri = `mongodb+srv://kumarnitesh251:darling@myshop.46ccu.mongodb.net/?retryWrites=true&w=majority&appName=MYSHOP`
const connectionUri = `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASS}@${process.env.DB_HOST}/?retryWrites=true&w=majority&appName=${process.env.DB_APP_NAME}`;

const dbConnection= mongoose.connect(connectionUri, connectionpOptions).then(()=>{
    console.log("Database connected successfully");
}).catch(error=>{
    console.log("Database connection failed")
})

module.export = dbConnection;
