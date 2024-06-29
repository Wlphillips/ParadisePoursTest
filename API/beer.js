const express = require('express');
const {getClient} = require('../database');
const ObjectId = require('mongodb').ObjectId;
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

//User can favorite Beer by adding UserId to the Drink's Favorite array
router.post('/favoriteBeer', async(req, res) => {
    const db = getClient().db('AlcoholDatabase')
    const {_id, UserId} = req.body
    const BeerId = new ObjectId(_id)
    const updateBeer = await db.collection('Beer').updateOne(
        { _id: BeerId },
        { $push: { Favorites: {UserId: UserId}, } })

    if(updateBeer){
        res.status(200).json({updateBeer, message:"User has favorited their beer"})
    }
    else{
        res.status(400).json({message:"User could not favorite beer"})
    }
})

//User can unfavorite Beer by deleting UserId from the Drink's Favorite array
router.post('/unfavoriteBeer', async(req, res) => {
    const db = getClient().db('AlcoholDatabase')
    const {_id, UserId} = req.body
    const BeerId = new ObjectId(_id)
    const result = await db.collection('Beer').findOneAndUpdate({_id: BeerId}, {$pull: {Favorites: {UserId: UserId}}})
    if(updateBeer){
        res.status(200).json({updateBeer, message:"User has unfavorited their beer"})
    }
    else{
        res.status(400).json({message:"User could not unfavorite beer"})
    }
})

module.exports = router
