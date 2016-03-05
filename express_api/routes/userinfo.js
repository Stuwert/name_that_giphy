var express = require('express');
var router = express.Router();
var knex = require('../db/knex')


// router.use(function(req, res, next){
//   if(req.params.user_id === req.cookies.id){
//     next()
//   }
//   else{
//     res.send("NOT ALLOWED!");
//   }
// })

router.get('/:username', function(req, res, next){
  console.log("Nailed it!");
  knex.from('users').join('scores', 'users.id', 'scores.user_id').where('users.username', req.params.username).column('score').then(function(response){
    res.json(response);
  })
})


function Users(){
  return knex('users')
}

module.exports = router;
