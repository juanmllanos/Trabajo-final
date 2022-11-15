const mongoose = require('mongoose')
require('dotenv').config()

const URI = process.env.DB_URI

mongoose.connect(URI, (err) => {
    err
    ? console.log('\033[31m' + err)
    : console.log('\033[32m "Mongo Atlas conected OK"');
})

