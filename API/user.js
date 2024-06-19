const express = require('express');
const {getClient} = require('../database');
const router = express.Router();

// User Registration
router.post('/register', async (req, res, next) => {
    const db = getClient().db('AlcoholDatabase')
    const {UserId, FirstName, LastName, Username, Password, Email, Phone} = req.body //May need to be adjusted if we need to have email verification

    //Verification to check if username and email exists in the database
    let results = await db.collection('Users').find({ Username:Username}).toArray()
    if(results.length > 0){
        return res.status(409).json({ error: 'Username already exists' });
    }
    results = await db.collection('Users').find({ Email:Email}).toArray()
    if(results.length > 0){
        return res.status(409).json({ error: 'Email already exists' });
    }


    //Used to auto-increment UserId using last register user's id
    let nextUserId
    const lastUser = await db.collection('Users').find().sort({ UserId:-1 }).limit(1).toArray()
    if(lastUser.length > 0){
        nextUserId = lastUser[0].UserId + 1
    }
    else{
        nextUserId = 1
    }

    const user = {UserId:nextUserId, FirstName, LastName, Username, Password, Email, Phone}

    await db.collection('Users').insertOne(user)
    var ret = { UserId:nextUserId, FirstName:FirstName, LastName:LastName, 
    Username:Username, Password:Password, Email:Email, Phone:Phone, Message:'User successfully registered'}
    res.status(200).json(ret)
});

// User Login
router.post('/login', async (req, res, next) => {
    const db = getClient().db('AlcoholDatabase')
    var error = ''
    const { Username, Password } = req.body
    const results = await db.collection('Users').find({ Username:Username,Password:Password}).toArray()
    var id = -1
    var fn = ''
    var ln = ''
    
    if( results.length > 0 ) {
        id = results[0].UserId
        fn = results[0].FirstName
        ln = results[0].LastName
    }
    else{
        return res.status(401).json({error:"Invalid Username or Password"})
    }
    
    var ret = { UserId:id, FirstName:fn, LastName:ln, Message:'User successfully logged in'}
    res.status(200).json(ret)
})

module.exports = router;
