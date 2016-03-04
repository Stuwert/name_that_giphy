var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var Promise = require('bluebird');
/* GET home page. */

router.get('/gif/:searchTerm', function(req, res, next) {
  var rezults = [];
  var promeesies = [];

  promeesies.push(new Promise (function(resolve, reject){
    unirest.get('http://api.giphy.com/v1/gifs/search?q='+req.params.searchTerm+'&api_key=dc6zaTOxFJmzC&limit=1')
    .end(function (response) {
      resolve(response);
    });
  }))

  for(var i=0; i<3; i++){
    promeesies.push(
      new Promise (function(resolve, reject){
        unirest.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+req.params.searchTerm)
        .end(function (response) {
          resolve(response);
        });
      })
    )
  }

  Promise.all(promeesies).then(function(results){
    results.forEach(function(item){
      rezults.push(item.body)
    })
    res.json(rezults);
  }, function(reject){
    console.log(reject)
  })
});

module.exports = router;
