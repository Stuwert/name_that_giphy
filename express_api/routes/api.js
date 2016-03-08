var express = require('express');
var router = express.Router();
var unirest = require('unirest');
var Promise = require('bluebird');

Array.prototype.randomized = require('../misc/arrayrandomizer');

/* GET home page. */

router.get('/gif/:searchTerm', function(req, res, next) {
  var rezults = [];
  var promeesies = [];

 unirest.get('http://api.wordnik.com:80/v4/words.json/randomWords?hasDictionaryDef=false&includePartOfSpeech=noun&minCorpusCount=350&maxCorpusCount=-1&minDictionaryCount=1&maxDictionaryCount=-1&minLength=5&maxLength=-1&limit=2&api_key=97d94b0b7779a50ac900e04879302f1c70b3d0fa7b6102f20')
  .end(function(words){
    promeesies.push(new Promise (function(resolve, reject){
      unirest.get('http://api.giphy.com/v1/gifs/search?q='+req.params.searchTerm+'&api_key=dc6zaTOxFJmzC&limit=1')
      .end(function (response) {
        resolve(response);
      });
    }))
    var searchTerms = words.body;
    searchTerms.forEach(function(item){
      promeesies.push(
        new Promise (function(resolve, reject){
          unirest.get('http://api.giphy.com/v1/gifs/random?api_key=dc6zaTOxFJmzC&tag='+item.word)
          .end(function (response) {
            resolve(response);
          });
        })
      )
    })
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
    // resolve(response);
  })



});


module.exports = router;
