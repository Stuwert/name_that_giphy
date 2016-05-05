var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');
var knex = require('../db/knex');
var jwt = require('jsonwebtoken');


var Users = function(){
  return knex('users');
}

router.post('/signup', function(req, res, next){
  var hash = bcrypt.hashSync(req.body.password, 10)
  var token = jwt.sign(req.body.username, 'giphyrulez');
  Users().insert({
    username: req.body.username,
    password: hash,
    email: req.body.email,
    JWT: token
  }).returning('JWT').then(function(JWT){
    res.json({token: JWT, message: 'successful'})
  })
})


router.post('/signin', function(req, res, next){
  Users().where('username', req.body.username).first().then(function(result){
    if(result && bcrypt.compareSync(req.body.password, result.password)){
      res.json({
        token: result.JWT,
        message: 'Success!',
      })
    }else{
      res.status(400).json({message: 'Fail!'})
    }
  })
})

function getToken(token){
  jwt.verify(token, 'giphyrocks', {}, verifyToken);

  function verifyToken (err, decoded){
    console.log(err);
    console.log(decoded);
  }
}






module.exports = router;
