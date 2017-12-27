const fs = require('fs')
const csv2json = require('./csv2json')

const fileName = process.argv[2]
fs.readFile(fileName, 'utf-8', (error, data) => {
    if (error) {
        console.log(err)
        process.exit(1)
    }
    console.log(csv2json(data))
})
