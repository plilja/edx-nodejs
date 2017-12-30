const mongodb = require('mongodb')
const fs = require('fs')
const async = require('async')

const chunkSize = Number(process.argv[2])
const file1 = 'm3-customer-address-data.json'
const file2 = 'm3-customer-data.json'
const url = 'mongodb://localhost:27017/edx-course-db'

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

const mergeSpan = (db, records1, records2, startSpan, endSpan, callback) => {
    const customers = db.collection('customer')
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

mongodb.MongoClient.connect(url, (error, db) => {
    fs.readFile(file1, 'utf-8', (error1, data1_raw) => {
        if (error1) {
            console.error(error1)
            return process.exit(1)
        }
        fs.readFile(file2, 'utf-8', (error2, data2_raw) => {
            if (error2) {
                console.error(error2)
                return process.exit(1)
            }
            const records1 = JSON.parse(data1_raw)
            const records2 = JSON.parse(data2_raw)

            // Prepare jobs
            const jobs = []
            for (let i = 0; i < records1.length; i += chunkSize) {
                jobs.push((callback) => {
                    mergeSpan(db, records1, records2, i, i + chunkSize, callback)
                })
            }

            // Execute jobs
            async.parallel(jobs, (error, results) => {
                if (error) {
                    console.error(error)
                    return process.exit(1)
                }
                db.close()
            })
        })
    })
})
