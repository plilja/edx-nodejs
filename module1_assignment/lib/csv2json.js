
module.exports = (csvContent) => {
    const rows = csvContent.split('\n')
    const arr = []
    const headers = rows[0].split(',')
    for (let i = 1; i < rows.length; ++i) {
        const csvRow = rows[i]
        const csvCells = csvRow.split(',')
        const jsonRow = {}
        for (let j = 0; j < headers.length; ++j) {
            jsonRow[headers[j]] = csvCells[j]
        }
        arr.push(jsonRow)
    }
    return JSON.stringify(arr)
}

