const mongoose = require('mongoose');

//Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels' // Replace 'mydatabase' with your database name

//Setup MongoDB connection
mongoose.connect(mongoURL)
//Get the default cinnection
//Mongoose maintains a default connection object representing the MongoDB connections.
const db = mongoose.connection;

//Define event listeners for database connection
db.on('connected',()=>{
    console.log('Connected to MongoDB Server');
});
db.on('error',()=>{
    console.log('error in the Mongdb server');
});
db.on('disconnected',()=>{
    console.log('MongoDB Disconnected');
});

//Export the database connection
module.exports = db;

//now we export db.js to server.js