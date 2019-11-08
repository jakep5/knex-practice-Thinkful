const knex = require('knex')
require('dotenv').config();

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

console.log('knex and driver installed correctly');

/* knexInstance.from('amazong_products').select('*') //is accessing the database here
    .then(result => {
        console.log(result)
    }) */

const qry = knexInstance
    .select('product_id', 'name', 'price', 'category')
    .from('amazong_products')
    .where({ name: 'Point of view gun' })
    .first()
    .toQuery()
    /* .then(result => {
        console.log(result) 
    }) */

const searchTerm = 'holo';

function searchByProduceName(searchTerm) {
    knexInstance
        .select('product_id', 'name', 'price', 'category')
        .from('amazong_products')
        .where('name', 'ILIKE', `%${searchTerm}%`)
        .then(result => {
            console.log(result)
        })
}

searchByProduceName('holo');

function paginateProducts(page) {
    const productsPerPage = 10
    const offset = productsPerPage * (page - 1)
    knexInstance
        .select('product_id', 'name', 'category')
        .from('amazong_products')
        .limit(productsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

paginateProducts(2)

console.log(qry)