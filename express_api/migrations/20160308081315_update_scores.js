
exports.up = function(knex, Promise) {
  return knex.schema.table('scores', function(table){
    table.json('words_used')
  })
};

exports.down = function(knex, Promise) {
  return knex.schema.table('scores', function(table){
    table.dropColumn('words_used')
  })
};
