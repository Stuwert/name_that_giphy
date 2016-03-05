
exports.up = function(knex, Promise) {
  return knex.schema.table('users', function(table){
    table.text('JWT')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.dropTable('users')
};
