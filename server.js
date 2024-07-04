const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const {connectDatabase, closeDatabase} = require('./database');

const app = express();
app.use(bodyParser.json());
app.use(cookieParser());

const userAPI = require('./API/user');
const beerAPI = require('./API/beer'); // Import beer API
app.use('/api', userAPI); // Mount user APIs
app.use('/api', beerAPI); // Mount beer API

// CORS Middleware
app.use(cors({
  origin: "http://localhost:3000" //Allows us to send cookies to client w/o CORS policy issues.
}
));
app.use((req, res, next) => 
{
  //res.setHeader('Access-Control-Allow-Origin', '*'); CORS error when sending cookies if we use this.
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

// Wrapper that connects to MongoDB using connectDatabase() import
connectDatabase().then(() => {
  try{
    app.listen(5000); // Starts server on port 5000
  }
  catch(error){
    console.log("Server not started...");
  }
})
