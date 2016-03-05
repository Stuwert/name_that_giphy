var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../db/knex');


var Users = function(){
  return knex('users');
}

router.get('/signup', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, 10)
  Users().insert({
    username: req.body.username,
    password: hash,
    email: req.body.email
  }).returning('id').then(function(id){
    res.cookie('id', id).send('Cookie is set!');
  })
})


router.get('/signin', function(req, res, next){
  Users().where('username', req.body.username).first().then(function(result){
    if(result && bcrypt.compareSync(result.password, req.body.password)){
      res.cookie('id', result.id).send('Cookie is set!');
    }
    else{
      res.send('YOU FAIL!')
    }
  })
})








module.exports = router;
