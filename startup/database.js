const debug = require('debug')('a3')

const mongoose = require('mongoose')

module.exports = () => {

    mongoose.connect(`mongodb://localhost:27017/finale`,
    {
        useNewUrlParser : true
    })
    .then (()=> {

        debug(`Connected to MongoDb...`)

    })
    .catch(err => {

        debug(`Error connecting to MongoDB ...`, err)

        process.exit(1)
    })
}