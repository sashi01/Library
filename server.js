if (process.env.NODE_ENV != 'production') {
    require('dotenv').config()
} 
const express = require('express')
const app = express()
const expressLayouts = require('express-ejs-layouts')
const bodyParser = require('body-parser')

app.set('views', __dirname + '/views')

//-- Set the beginning and ending of every HTML page
app.set('layout', 'layouts/layout')

//-- EJS
app.set('view engine', 'ejs')
app.use(expressLayouts)

//-- Set public folder
app.use(express.static('public'))

//-- Set Body-Parser
app.use(bodyParser.urlencoded({limit: '10mb', extended: false}))

//-- Set DB
const mongoose = require('mongoose')
mongoose.connect(process.env.DATABASE_URL,{ 
    useNewUrlParser: true, useUnifiedTopology: true 
})

//-- Set routes
const indexRouter = require('./routes/index')
app.use('/', indexRouter)

const authorRouter = require('./routes/authors')
app.use('/authors', authorRouter)

const booksRouter = require('./routes/books')
app.use('/books', booksRouter)

//-- Initialise app
app.listen(process.env.PORT || 3000)
