const csv = require('csv-parser')
const fs = require('fs')
const path = require('path');
const { monitorEventLoopDelay } = require('perf_hooks');
const { v4: uuidv4 } = require('uuid');

const EMAIL_FILE_PATH = './data.csv'
let result = []

const createJson = () => {
    fs.createReadStream(EMAIL_FILE_PATH)
    .pipe(csv({}))
    .on('data', (data) => {
        result.push(data)
    })
    .on('end', () => {
        fs.writeFileSync('../assets/user.json', JSON.stringify(result, null, 1))
    })
}

module.exports = createJson

