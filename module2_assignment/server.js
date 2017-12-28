const express = require('express')
const logger = require('morgan')
const errorhandler = require('errorhandler')
const bodyParser = require('body-parser')
const postsRoute = require('./routes')

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

postsRoute('/', app)

app.listen(3000)
