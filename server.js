if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
} 
const express = require('express')
const app = express()

const expressLayouts = require('express-ejs-layouts')

app.set('view engine', 'ejs')
app.set('views', __dirname + '/views')

//-- Set the beginning and ending of every HTML page
app.set('layout', 'layouts/layout')

//-- Use express layouts 
app.use(expressLayouts)

//-- Set public folder
app.use(express.static('public'))

//-- Set DB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ 
    useNewUrlParser: true, useUnifiedTopology: true 
})

//-- Set routes
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

//-- Initialise app
app.listen(process.env.PORT || 3000)