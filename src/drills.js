const knex = require('knex')
require('dotenv').config();

const knexInstance = knex({
    client: 'pg',
    connection: process.env.DB_URL
})

console.log('knex and driver installed correctly');

//Get all items that contain text - find rows that contain a searchterm
function searchShoppingListItems(searchTerm) {
    knexInstance
        .select('item_id', 'name')
        .from('shopping_list')
        .where('name', 'ILIKE', `%${searchTerm}`)
        .then(result => {
            console.log(result)
        })
}

/* searchShoppingListItems('ham'); */

function returnAllItemsPaginated(pageNumber) {
    const itemsPerPage = 6;
    const offset = itemsPerPage * (pageNumber - 1)
    knexInstance
        .select('item_id', 'name', 'price', 'date_added', 'checked', 'category')
        .from('shopping_list')
        .limit(itemsPerPage)
        .offset(offset)
        .then(result => {
            console.log(result)
        })
}

/* returnAllItemsPaginated(4); */

function getItemsAddedAfterDate(daysAgo) {
    knexInstance 
        .select('name', 'price')
        .count('date_added AS date')
        .where(
            'date_added',
            '>',
            knexInstance.raw(`now() - '?? days' ::INTERVAL`, daysAgo)
        )
        .from('shopping_list')
        .groupBy('name', 'price')
        .then(result => {
            console.log(result)
        })
}

/* getItemsAddedAfterDate(2); */

function costPerCategory() {
    knexInstance
        .select('category')
        .sum('price as total')
        .from('shopping_list')
        .groupBy('category')
        .then(result => {
            console.log('COST PER CATEGORY')
            console.log(result)
        })
}

costPerCategory()