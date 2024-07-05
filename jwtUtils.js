const jwt = require('jsonwebtoken')
const {getClient} = require('./database')
JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxOTkyNzUyMywiaWF0IjoxNzE5OTI3NTIzfQ.TMcuZI8dhkTphWsGpyrU-T7NDN6W9vOp0yrPThkxwiQ'
JWT_REFRESH = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMDEzMDIwNywiaWF0IjoxNzIwMTMwMjA3fQ.Y1aYqeQg_oG2lBKiDmiEGG2hnxHO-FLYRuOkBlFoyzw'

//Generates access token that contains user information
function generateAccessToken(user){
    return jwt.sign({User: user}, JWT_SECRET, {expiresIn: '15m'})
}

//Generates a refresh token that only contains user id
function generateRefreshToken(UserId){
    return jwt.sign({UserId: UserId}, JWT_REFRESH, {expiresIn: '1d'})
}

//Verifies access token and returns user information. If access token is expired, a new access token will be produced to retrieve user.
async function authUser(req, res, next){
    const accessToken = req.cookies.accessToken
    const refreshToken = req.cookies.refreshToken
    
    if (!accessToken) {
        return res.status(401).json({ error: 'Access token not found.' })
    }

    try {
        const decoded = jwt.decode(accessToken)
        if (!decoded || !decoded.exp) { //If Access Token does not exist
            return res.status(401).json({ error: 'Invalid access token.' })
        }

        //If Access Token is expired, refresh using refresh token
        const currentTimestamp = Date.now() / 1000;
        if (decoded.exp < currentTimestamp) { 
            try {
                const { user, newAccessToken } = await refreshAccessToken(refreshToken)
                res.cookie('accessToken', newAccessToken, {
                    httpOnly: true,
                    secure: true,
                    sameSite: "none"
                })
                req.user = user
                console.log("Token was expired", req.user)
                next()
            } catch (refreshError) {
                return res.status(401).json({ error: 'Failed to refresh access token.' })
            }
        } else {
            req.user = decoded.User // Access token is valid, authenticate the user
            console.log("Token was not expired", req.user)
            next()
        }
    } catch (error) {
        console.error('Error decoding token:', error.message)
        return res.status(500).json({ error: 'Internal Server Error.' })
    }
}

//Generates a new access token using a refresh acces token.
async function refreshAccessToken(refreshToken) {
    if (!refreshToken) {
        throw new Error('Refresh token not found.')
    }

    try {
        const decoded = jwt.verify(refreshToken, JWT_REFRESH); //Verifies refresh tokena and then decodes it for user id
        const UserId = decoded.UserId

        const db = getClient().db('AlcoholDatabase');
        const user = await db.collection('Users').findOne({ UserId: UserId }); //User id is used to find user to be packaged into the new access token.
        
        if (!user) {
            throw new Error('User not found.')
        }

        const newAccessToken = generateAccessToken(user); //New access token is created to be sent as a cookie.
        return { user, newAccessToken }
    } catch (error) {
        console.error('Refresh Token Error:', error.message);
        throw new Error('Invalid refresh token')
    }
}

module.exports = {generateAccessToken, generateRefreshToken, authUser, refreshAccessToken}
