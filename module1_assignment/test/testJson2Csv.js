var csv2json = require('../lib/csv2json.js')
var assert = require('assert')

describe('csv2json', () => {
    it('#should convert csv to json string', () => {
        const act = csv2json('foo,bar\n1,2\n3,4')
        const exp = '[{"foo":"1","bar":"2"},{"foo":"3","bar":"4"}]'
        assert.equal(exp, act)
    })
})
