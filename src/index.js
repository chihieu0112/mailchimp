const csv = require('csv-parser')
const fs = require('fs')
const { default: axios } = require('axios')

const EMAIL_FILE_PATH = './data.csv'
let csvData = []

fs.createReadStream(EMAIL_FILE_PATH)
    .pipe(csv({}))
    .on('data', (data) => {
        csvData.push(data)
    })
    .on('end', () => {
        fs.writeFileSync('../assets/user.json', JSON.stringify(csvData, null, 1))

        let users = JSON.parse(fs.readFileSync('../assets/user.json'))

        let usersData = users.map((item) => {
            item.status = 'subscribed'
            item.merge_fields = {
                FNAME: item.fname,
                LNAME: item.lname,
                PHONE: item.phone,
                BIRTHDAY: item.birthday
            }
            delete item.fname
            delete item.lname
            delete item.phone
            delete item.birthday
            return item
        })

        // --------- ADD LIST OF USERS AND UPDATE FIELDS ------------

         // axios({
        //     method: 'post',
        //     url: 'https://us12.api.mailchimp.com/3.0/lists/04a141da5a/',
        //     headers: { 'Authorization': 'Bearer 1c110f85e3e58a44fb5dcb58540a150b-us12' },
        //     data: { members: usersData }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //     })

        // --------- UNSUBSCRIBED ------------

        // axios({
        //     method: 'post',
        //     url: 'https://us12.api.mailchimp.com/3.0/lists/04a141da5a',
        //     headers: { 'Authorization': 'Bearer 1c110f85e3e58a44fb5dcb58540a150b-us12' },
        //     data: { 
        //         members: [{
        //             email_address: 'doubletranchau@gmail.com',
        //             status: 'unsubscribed',
        //         }],
        //         update_existing:true
        //     }
        // })
        //     .then(res => {
        //         console.log(res.data)
        //     })

       
    })






// axios({
//     method: 'get',
//     url: 'https://us12.api.mailchimp.com/3.0/lists/04a141da5a/members',
//     headers: { 'Authorization': 'Bearer 1c110f85e3e58a44fb5dcb58540a150b-us12' }
// })
//     .then(res => {
//         console.log(res.data)
//     })

