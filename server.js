const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const {connectDatabase, closeDatabase} = require('./database');

const app = express();
app.use(cors());
app.use(bodyParser.json());

//CORS Middleware
app.use((req, res, next) => 
{
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin, X-Requested-With, Content-Type, Accept, Authorization'
  );
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET, POST, PATCH, DELETE, OPTIONS' //May need to potentially update.
  );
  next();
});

//Wrapper that connects to MongDB using connectDatabase() import
connectDatabase().then(() => {
  //API Section
  const userAPI = require('./API/user');
  app.use('/api', userAPI); //To access user APIs, you would need to add '/api' before any route (i.e. /api/login)

  app.listen(5000); //Starts server on port 5000
})
