require ('dotenv').config
const express = require('express')
const cors = require('cors')

const errorHandler = require('./handlers/error')
const authRoutes = require('./routes/auth')
const {loginRequired, ensureCorrectUser} = require('./middleware/auth')

const app = express()
const PORT = process.env.PORT || 8080  //BOILERPLATE - Remeber to setup .env file
app.use(cors())
app.use(express.urlencoded({extended: true})) //Express 4.16.0 now includes body-parser

//Routes
app.use('/auth', authRoutes)

app.use(function(req, res, next){
    let err = new Error ("Not Found")
    err.status = 404
    next(err)
})

app.use(errorHandler)

//Start server
app.listen(PORT, function(){
    console.log(`Server listening on port ${PORT}`)
})