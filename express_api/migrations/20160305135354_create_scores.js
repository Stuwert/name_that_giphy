
exports.up = function(knex, Promise) {
  return knex.schema.createTable('scores', function(table){
    table.increments()
    table.timestamp('time')
    table.integer('score')
    table.integer('user_id')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('scores')
};
