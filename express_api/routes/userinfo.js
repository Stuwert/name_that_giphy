var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var jwt = require('jsonwebtoken')


router.use('/:username', function(req, res, next){
  console.log(req.params);
  console.log("It hit");
  console.log(req.headers);
  var verification = jwt.verify(req.header.token, 'giphyrulez');
  //If token username === username, next, else, send back error.

  // console.log(verification);
  // if(req.params.user_id === req.cookies.id){
  //   next()
  // }
  // else{
  //   res.send("NOT ALLOWED!");
  // }
})

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
