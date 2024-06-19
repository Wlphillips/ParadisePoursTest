const express = require('express');
const {getClient} = require('../database');
const router = express.Router();


//User Registration
router.post('/register', async (req, res, next) => {
    const db = getClient().db('AlcoholDatabase');
    const {UserId, FirstName, LastName, Username, Password, Email, Phone} = req.body
    const user = {UserId, FirstName, LastName, Username, Password, Email, Phone}
    await db.collection('Users').insertOne(user);
});

//User Login
router.post('/login', async (req, res, next) => {
    const db = getClient().db('AlcoholDatabase');
    var error = ''
    const { Username, Password } = req.body
    const results = await
    db.collection('Users').find({ Username:Username,Password:Password}).toArray()
    var id = -1
    var fn = ''
    var ln = ''
    
    if( results.length > 0 ) {
        id = results[0].UserId
        fn = results[0].FirstName
        ln = results[0].LastName
    }
    
    var ret = { id:id, firstName:fn, lastName:ln, error:''}
    res.status(200).json(ret)
})

module.exports = router;