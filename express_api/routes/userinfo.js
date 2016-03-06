var express = require('express');
var router = express.Router();
var knex = require('../db/knex')
var jwt = require('jsonwebtoken')


router.get('/:username', function(req, res, next){
  var verification = jwt.verify(req.headers.token, 'giphyrulez');
  if (verification === req.params.username) {
    next();
  }else{
    res.status(401).json('Not Allowed!')
  }
})

router.get('/:username', function(req, res, next){
  knex.from('users').join('scores', 'users.id', 'scores.user_id').where('users.username', req.params.username).column('score').then(function(response){
    console.log(response);
    res.json(response);
  })
})


function Users(){
  return knex('users')
}

module.exports = router;
