const express = require('express')
const logger = require('morgan');
const errorhandler = require('errorhandler');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise
mongoose.connect('mongodb://localhost:27017/edx-course-db')

const Account = mongoose.model('Account',
    {
        name: String,
        balance: Number
    }
)

const app = express()
app.use(bodyParser.json())
app.use(logger('dev'))
app.use(errorhandler())

app.get('/accounts', (req, res) => {
    const accounts = Account.find()
    .exec((err, comments) => {
        res.status(200).send(comments)
    })
})

app.post('/accounts', (req, res) => {
    const account = new Account(req.body)
    account.save((err) => {
        if (err) {
            return console.error(err)
        }
        res.status(201).send({ id: account.id })
    })
})

app.get('/accounts/:id', (req, res) => {
    Account.findById(req.params.id)
        .exec((err, account) => {
            if (err) {
                return console.error(err)
            }
            res.status(200).send(account)
        })
})

app.put('/accounts/:id', (req, res) => {
    Account.findById(req.params.id)
        .exec((err, account) => {
            if (err) {
                return console.error(err)
            }
            account.name = req.body.name
            account.balance = req.body.balance
            account.save((err) => {
                if (err) {
                    return console.error(err)
                }
                res.status(200).send()
            })
        })
})

app.delete('/accounts/:id', (req, res) => {
    Account.findById(req.params.id)
        .exec((err, account) => {
            if (err) {
                return console.error(err)
            }
            account.remove((err) => {
                if (err) {
                    return console.error(err)
                }
                res.status(204).send()
            })
        })
})

app.listen(3000)
