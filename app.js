
const debug = require('debug')('a3')

require('./startup/database')()

const express = require('express')

const app = express()

app.use(express.json())

app.use('/api/Students',require('./Routes/student'))

app.use('/api/Courses',require('./Routes/course'))

app.use('/auth', require('./Routes/Authentication'))

const port = process.env.PORT || 3030

app.listen(port, () => debug(`Express is listening on port ${port}...`))
