const mongoose = require('mongoose');
require('dotenv').config();

//Define the MongoDB connection URL
const mongoURL = process.env.MONGODB_URL_LOCAL    // Replace 'mydatabase' with your database name
//const mongoURL = process.env.MONGODB_URL;

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