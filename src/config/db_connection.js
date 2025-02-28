const mongoose = require('mongoose');

const db_name = process.env.DB_NAME;
const db_url = process.env.DB_URL
mongoose.connect(`${db_url}/${db_name}`, {
    // useNewUrlParser: true, useUnifiedTopology: true
})
    .then(() => {
        console.log('Database connected successfull.');
    })
    .catch((err) => {
        console.log(err);
        console.log('Database connection failed');
    })

// module.exports = mongoose;