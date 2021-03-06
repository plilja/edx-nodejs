const mongodb = require('mongodb')
const fs = require('fs')
const async = require('async')
const records1 = require('./m3-customer-address-data');
const records2 = require('./m3-customer-data');

const chunkSize = Number(process.argv[2])
const url = 'mongodb://localhost:27017'

const mergeRecords = (record1, record2) => {
    return {
        first_name: record2.first_name,
        last_name: record2.last_name,
        email: record2.email,
        gender: record2.gender,
        ip_address: record2.ip_address,
        ssn: record2.ssn,
        credit_card: record2.credit_card,
        bitcoin: record2.bitcoin,
        street_address: record2.street_Address,
        country: record1.country,
        city: record1.city,
        state: record1.state,
        phone: record1.phone
    }
}

const mergeSpan = (db, startSpan, endSpan, callback) => {
    const customers = db.collection('customers')
    const newCustomers = []
    for (let i = startSpan; i < Math.min(endSpan, records1.length); i++) {
        const data = mergeRecords(records1[i], records2[i])
        newCustomers.push(data)
    }
    customers.insert(newCustomers, (error, results) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        }
        callback()
    })
}

mongodb.MongoClient.connect(url, {useNewUrlParser: true}, (error, client) => {
    const db = client.db('edx-course-db');
    // Prepare jobs
    const jobs = []
    for (let i = 0; i < records1.length; i += chunkSize) {
        jobs.push((callback) => {
            mergeSpan(db, i, i + chunkSize, callback)
        })
    }

    // Execute jobs
    async.parallel(jobs, (error, results) => {
        if (error) {
            console.error(error)
            return process.exit(1)
        }
        client.close()
    })
})
