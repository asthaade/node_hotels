const express = require('express')
const app = express();
const db = require('./db');
require('dotenv').config();
const passport = require('./auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json());                     //collect all data convert it in object and store in res.body
const PORT = process.env.PORT || 3000;

//Middleware Function
const LogRequest = (req, res, next)=>{
  console.log(`${new Date().toLocaleString()} Request Made to : ${req.originalUrl}`);
  next();                    //Move to the next phase
}
app.use(LogRequest);

app.use(passport.initialize());

const localAuthMiddleware = passport.authenticate('local',{session:false})
app.get('/',function (req, res){
  res.send('Welcome to Our hotel')
})

//Import the person router files
const personRoutes = require('./routes/personRoutes');
//Use the routes
app.use('/person',personRoutes);


//Import the menuitem router files
const menuItemRoutes = require('./routes/menuItemRoutes');
//Use the routes
app.use('/menuitem', menuItemRoutes);


app.listen(3000,()=>{
  console.log('Listening on port 3000');
})