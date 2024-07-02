const jwt = require('jsonwebtoken')
JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxOTkyNzUyMywiaWF0IjoxNzE5OTI3NTIzfQ.TMcuZI8dhkTphWsGpyrU-T7NDN6W9vOp0yrPThkxwiQ'

function generateToken(userId) {
    return jwt.sign({User: userId}, JWT_SECRET, {expiresIn: '1d'})
}

module.exports = {generateToken}
