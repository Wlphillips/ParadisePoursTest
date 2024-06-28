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

// Add the routes for managing favorite beers
router.post('/favorites/beer', async (req, res) => {
    const { userId, beerId } = req.body;

    try {
        const user = await User.findOne({ UserId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        if (user.Drinks.includes(beerId)) {
            return res.status(400).json({ error: 'Beer already in favorites' });
        }

        user.Drinks.push(beerId);
        await user.save();

        res.status(200).json({ favorites: user.Drinks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.delete('/favorites/beer', async (req, res) => {
    const { userId, beerId } = req.body;

    try {
        const user = await User.findOne({ UserId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        user.Drinks = user.Drinks.filter(id => id.toString() !== beerId);
        await user.save();

        res.status(200).json({ favorites: user.Drinks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

router.get('/favorites/beer', async (req, res) => {
    const { userId } = req.query;

    try {
        const db = getClient().db('AlcoholDatabase');
        const user = await User.findOne({ UserId: userId });
        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        const favoriteBeers = await db.collection('Beer').find({ _id: { $in: user.Drinks } }).toArray();

        res.status(200).json({ favorites: favoriteBeers });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

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

module.exports = router
