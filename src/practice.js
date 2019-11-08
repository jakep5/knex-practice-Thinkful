const knex = require('knex')
require('dotenv').config();

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

console.log('knex and driver installed correctly');

knexInstance.from('amazong_products').select('*') //is accessing the database here
    .then(result => {
        console.log(result)
    })