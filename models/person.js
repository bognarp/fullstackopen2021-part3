const mongoose = require('mongoose')
const uniqueValidator = require('mongoose-unique-validator')

const url = process.env.MONGODB_URI

console.log('connecting to', url);

mongoose.connect(url)
    .then(result => {
        console.log('connected to MongoDB');
    })
    .catch(error => {
        console.log('error connecting to MongoDb:', error.message);
    })

const personSchema = new mongoose.Schema({
    name: {
        type: String,
        minLength: 3,
        required: true,
        unique: true
    },
    number: {
        type: String,
        minLength: 8
    }
})

personSchema.plugin(uniqueValidator)

personSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    }
})

module.exports = mongoose.model('Person', personSchema)
