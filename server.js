const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(bodyParser.json());

const MongoClient = require('mongodb').MongoClient;
const url =
'mongodb+srv://wlphillips:Admin@cluster0.tjtuhkp.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
const client = new MongoClient(url);
client.connect();

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

//API Section
//User Register
app.post('/api/register', async (req, res, next) => {
    const db = client.db('AlcoholDatabase');
    const {UserId, FirstName, LastName, Username, Password, Email, Phone} = req.body
    const user = {UserId, FirstName, LastName, Username, Password, Email, Phone}
    await db.collection('Users').insertOne(user);
})

app.listen(5000); // Node + Express server will be on port 5000