var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var Promise = require('bluebird');

Array.prototype.randomized = require('../misc/arrayrandomizer');

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
    results.forEach(function(item, i){
      if(i !== 0){
        rezults.push({answer: false, image: item.body.data.image_url})
      }else{
        rezults.push({answer: true, image: item.body.data[0].images.downsized.url})
      }
    })
    res.json(rezults.randomized());
  }, function(reject){
    console.log(reject);
  })
});


module.exports = router;
