var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../db/knex');


var Users = function(){
  return knex('users');
}

router.post('/signup', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, 10)
  Users().insert({
    username: req.body.username,
    password: hash,
    email: req.body.email
  }).returning('id').then(function(id){
    res.cookie('giphChallengeUserId', id).send('Cookie is set!');
  })
})


router.post('/signin', function(req, res, next){
  Users().where('username', req.body.username).first().then(function(result){
    if(result && bcrypt.compareSync(req.body.password, result.password)){
      res.cookie('giphChallengeUserId', result.id).send('Cookie is set!');
      console.log(req.cookies);
    }
    else{
      res.send('YOU FAIL!')
    }
  })
})








module.exports = router;
