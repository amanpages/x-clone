const mongoose = require('mongoose');

// function to connect with database
const connectWithDb = () => {
    mongoose.connect(process.env.MONGODB_URL)
    .then(console.log('Database connected to MongoDB Atlas'))
    .catch((error) => {
        console.log('Error in DB connection');
        console.log(error);
        process.exit(1);
    });
}

module.exports = connectWithDb;