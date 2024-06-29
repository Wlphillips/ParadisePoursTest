const express = require('express');
const {getClient} = require('../database');
const router = express.Router();
const nodemailer = require('nodemailer');

//API Section
// User Registration
router.post('/register', async (req, res, next) => {
    const db = getClient().db('AlcoholDatabase')
    const {FirstName, LastName, Username, Password, Email, Phone} = req.body //May need to be adjusted if we need to have email verification

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

    const uniqueString = randString() //Used to help create a unique verification link that is attached to the user's account

    const user = {UserId:nextUserId, FirstName, LastName, Username, Password, Email, Phone, Verified:false, uniqueString, Drinks:[]}

    await db.collection('Users').insertOne(user)
    sendMail(Email, uniqueString, 1)

    var ret = { UserId:nextUserId, FirstName:FirstName, LastName:LastName, 
    Username:Username, Password:Password, Email:Email, Phone:Phone, Message:"User successfully registered. Verification email has been sent."}
    res.status(201).json(ret)
});

// User Login
router.post('/login', async (req, res, next) => {
    const db = getClient().db('AlcoholDatabase')
    const { Username, Password } = req.body
    const results = await db.collection('Users').find({ Username:Username,Password:Password}).toArray()
    var id = -1
    var fn = ''
    var ln = ''
    
    if( results.length > 0 && results[0].Verified) {
        id = results[0].UserId
        fn = results[0].FirstName
        ln = results[0].LastName
    }
    else if(results.length > 0 && !results[0].Verified){
        return res.status(401).json({error:"Account has not been verified"}) 
    }
    else{
        return res.status(404).json({error:"Invalid Username or Password"})
    }
    
    var ret = { UserId:id, FirstName:fn, LastName:ln, Message:"User successfully logged in"}
    res.status(200).json(ret)
})

// User Verification - Verifies user in the database when they click email link.
router.get('/verify/:uniqueString', async(req, res) => {
    const db = getClient().db('AlcoholDatabase')
    const{uniqueString} = req.params
    const result = await db.collection('Users').updateOne({ uniqueString: uniqueString }, { $set: { Verified: true } })// Finds user using uniqueString then updates Verified to true
    if(result){
        res.status(200).json({Message:"User has been successfully verified"})
    }
    else{
        return res.status(404).json({error:"Error validating user"})
    }
})

//Forget Password - User enters email address and email is sent with a link to change password
router.post('/recoverAccount', async(req, res) => {
    const db = getClient().db('AlcoholDatabase')
    const {Email} = req.body
    const uniqueString = randString()
    const result = await db.collection('Users').updateOne({ Email: Email }, { $set: { uniqueString: uniqueString } })
    if(result){
        sendMail(Email, uniqueString, 2)
        res.status(200).json({Message:"Recovery email has been sent"})
    }
    else{
        return res.status(404).json({error:"Email not found"})
    }
})

//Change Password - Requires the user to successfully input a new password and the same password again to confirm it
router.get('/changePassword/:uniqueString', async(req,res) => {
    const db = getClient().db('AlcoholDatabase')
    
    const{uniqueString} = req.params
    const{newPassword, confirmPassword} = req.body

    if(newPassword == confirmPassword){    
        const result = await db.collection('Users').updateOne({ uniqueString: uniqueString }, { $set: { Password: newPassword } })
        if(result){
            res.status(200).json({Message:"User has successfully changed their password"})
        }
        else{
            return res.status(400).json({error:"Error changing password"})
        }
    }
    else{
        return res.status(401).json({error:"Passwords do not match"})
    }
})

//Function Section
//Generates a unique string used for the verification link
const randString = () => {
    const length = 10
    let string = ''
    for(let i = 0; i < length; i++){
        const character = Math.floor((Math.random() * 10) + 1)
        string += character
    }

    return string
}

//Sends verification or change password emails to user
const sendMail = (Email, uniqueString, flag) => {
    const Transport = nodemailer.createTransport({
        service: 'gmail',
        host: "smtp.gmail.com", //
        port: 465,
        secure: true,
        auth: {
            user: '', // Use your gmail username
            pass: '' // Use an App Password, not your gmail password 
                                        //(Manage Your Google Account -> Security -> 2-Step Verification -> App Passwords)
        }
    })

    let mailOptions
    if(flag == 1){
        mailOptions = {
            from: 'noreply@domain.com',  //Change later   
            to: Email,
            subject: "Email Confirmation",
            html: `Press <a href=http://localhost:5000/api/verify/${uniqueString}> here </a> to verify your email.` //Links to the api/verify
        }    
    }
    else{
        mailOptions = {
            from: 'noreply@domain.com',  //Change later   
            to: Email,
            subject: "Change Password",
            html: `Press <a href=http://localhost:5000/api/changePassword/${uniqueString}> here </a> to change your password.` //Links to the api/changePassword
        }      
    }

    console.log(mailOptions)
    Transport.sendMail(mailOptions, function(error, res){
        if(error){
            console.log("Email was not sent.")
            console.log(error)
        }
        else{
            console.log("Email was sent.")
        }
    })

}

module.exports = router;
