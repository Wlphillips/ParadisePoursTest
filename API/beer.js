const express = require('express');
const {getClient} = require('../database');
const User = require('../models/User');
const router = express.Router();

//Beer Partial-Match Search - Users can use multiple parameters to find their drinks
router.post('/searchBeer', async(req, res) => {
    const db = getClient().db('AlcoholDatabase')
    const {Name, Company, Style, Origin} = req.body

    let filter = {}
    if(Name){
        filter.Name = {$regex: Name, $options: 'i'}
    }
    if(Company){
        filter.Company = {$regex: Company, $options: 'i'}
    }
    if(Style){
        filter.Style = {$regex: Style, $options: 'i'}
    }
    if(Origin){
        filter.Origin = {$regex: Origin, $options: 'i'}
    }

    const beer = await db.collection('Beer').find(filter).toArray()
    
    if(beer.length > 0){
        res.status(200).json({beer})
    }
    else{
        res.status(400).json({error:"No beers matched with the criteria"})
    }
})


router.get('/getAllBeers', async (req, res) => {
    const db = getClient().db('AlcoholDatabase'); // Replace with your database name
    const beers = await db.collection('Beer').find({}).toArray();

    if(beers.length > 0){
        res.status(200).json({beers})
    }
    else{
        res.status(400).json({error:"Couldn't retrieve all beers..."})
    }
});

//Favorites/Unfavorites beer by inserting UserId with a boolean field called Favorite into the Beer's Favorites object array
//Needs to be fixed. Correctly uploads user to the object array but cannot modify an existing user's Favorite yet.
router.post('/favoriteBeer', async(req, res) => {
    const db = getClient().db('AlcoholDatabase')
    const {UserId, BeerId} = req.body
    const result = await db.collection('Beer').find(BeerId).toArray()
    console.log(result[0])
    const objectId = new ObjectId(BeerId)
    
    if(result.length > 0){
        const beer = result[0]
        const userIndex = beer.Favorites.findIndex(favorite => favorite.UserId == UserId) //Searches for user inside the Favorites array

        if(userIndex != -1){
            if(beer.Favorites[userIndex].Favorite == false){ //Favorites the drink if user already exists in the object array.
                beer.Favorites[userIndex].Favorite = true
                res.status(200).json(beer.Favorites[userIndex].Favorite)
            }
            else{ //Unfavorites the drink if user already exists in the object array.
                beer.Favorites[userIndex].Favorite = false
                res.status(200).json(beer.Favorites[userIndex].Favorite)
            }
        }
        else{ //Adds user in the drink's object array and favorites
            beer.Favorites.push({UserId: UserId, Favorite: true})
            const updateResult = await db.collection('Beer').findOneAndUpdate({ _id: ObjectId },{ $push: { Favorites: beer.Favorites } })
            res.status(200).json({beer})
        }

    }
})


module.exports = router
