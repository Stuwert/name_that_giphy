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
  knex.from('users').join('scores', 'users.id', 'scores.user_id').where('users.username', req.params.username).column('score').orderBy('score', 'desc').then(function(response){
    res.json(response);
  })
})

router.post('/:username', function(req, res, next){
  Users().where('users.username', req.params.username).then(function(user){
    console.log(user);
    Scores().insert({
      user_id: user[0].id,
      time: knex.fn.now(),
      score: req.body.score,
    }).then(function(){
      res.status(200).json('It worked!')
    })
  })

})


function Users(){
  return knex('users')
}

function Scores(){
  return knex('scores')
}

module.exports = router;
