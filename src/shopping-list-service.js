const ShoppingListService = {
    getAllItems(knex) {
        return knex.select('*').from('shopping_list')
    },
    getById(knex, id) {
        return knex
            .from('shopping_list')
            .select('*')
            .where('id', id)
            .first()
    },
    insertItem(knex, newItem) {
        return knex
            .insert(newItem)
            .into('shopping_list')
            .returning('*')
            .then(rows => {
                return rows[0]
            }) 
    },
    updateItem(knex, id, newItemData) {
        return knex('shopping_list')
            .where({id})
            .update(newItemData)
    },
    deleteItem(knex, id) {
        return knex('shopping_list')
            .where({id})
            .delete()
    }
}

module.exports = ShoppingListService