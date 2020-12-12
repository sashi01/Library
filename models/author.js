const mongoose = require('mongoose')
const Book = require('./book')

const authorSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

authorSchema.pre('remove', function (next) {
    Book.find({author: this.id}, (err, books) => {
        if (err) {
            next(err)
        }else if (books != null && books.length > 0) { // do not remove author if it has books available
            next(new Error('The Author had books attached'))
        }else {
            next()
        }
    })
})

module.exports = mongoose.model('Author', authorSchema)