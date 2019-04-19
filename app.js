
const debug = require('debug')('a3')

require('./startup/database')()

const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/Pizzas',require('./Routes/Pizzas'))

//app.use('/api/Ingredients',require('./Routes/Ingredients'))

//app.use('/api/Orders',require('./Routes/Orders'))

app.use('/auth', require('./Routes/Authentication'))

const port = process.env.PORT || 3030

app.listen(port, () => debug(`Express is listening on port ${port}...`))
