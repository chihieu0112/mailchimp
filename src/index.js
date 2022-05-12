const createJson = require('./createJSON')

createJson()

const fs = require('fs')

let users = JSON.parse(fs.readFileSync('../assets/user.json'))

const express = require('express')
const { default: axios } = require('axios')
const app = express()

app.use(express.json())

axios({
    method: 'get',
    url: 'https://us12.api.mailchimp.com/3.0/lists/04a141da5a/members',
    headers: { 'Authorization': 'Bearer 1c110f85e3e58a44fb5dcb58540a150b-us12' }
})
    .then(res => {
        console.log(res.data)
    })

axios({
    method: 'post',
    url: 'https://us12.api.mailchimp.com/3.0/lists/04a141da5a/members',
    headers: { 'Authorization': 'Bearer 1c110f85e3e58a44fb5dcb58540a150b-us12' },
    data: [
        {
            email_address: "maniac@gmail.com",
            status: "subscribed",
            skipMergeValidation: true
        }
    ]
})
    .then(res => {
        console.log(res.data)
    })