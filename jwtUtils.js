const jwt = require('jsonwebtoken')
JWT_SECRET = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcxOTkyNzUyMywiaWF0IjoxNzE5OTI3NTIzfQ.TMcuZI8dhkTphWsGpyrU-T7NDN6W9vOp0yrPThkxwiQ'
JWT_REFRESH = 'eyJhbGciOiJIUzI1NiJ9.eyJSb2xlIjoiQWRtaW4iLCJJc3N1ZXIiOiJJc3N1ZXIiLCJVc2VybmFtZSI6IkphdmFJblVzZSIsImV4cCI6MTcyMDA0Njg1MSwiaWF0IjoxNzIwMDQ2ODUxfQ.u_oIzEqm4AkzujvD3cXHg56rGO5nclG2nf6R10rbEok'

function generateToken(user) {
    return jwt.sign({User: user}, JWT_SECRET, {expiresIn: '1d'})
}

function authUser(token){
    if(!token){
        console.log("token failed")
        return
    }
    return jwt.verify(token, JWT_SECRET)
}

function refreshToken(){

}

module.exports = {generateToken, authUser}
