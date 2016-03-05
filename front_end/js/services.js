//this is our inital express api call

app.service('gifCall', ['$http', function($http){
  var that = this;
  this.gifArray = [];
  this.searchForAGif = function(searchTerm){
    return $http.get('https://namethatgiphyapi.herokuapp.com/api/gif/' + searchTerm)
    // return $http.get('http://localhost:3000/api/gif/' + searchTerm)
  }

  this.setGifs = function(arr){
    this.gifArray = arr;
  }

}])


app.service('gameService', function(){
  this.score = 0;
  var that = this;
  this.incrementScore = function(){
    that.score++;
  }
  this.resetScore = function(){
    that.score = 0;
  }
  this.wordsUsed = [];

  this.addWord = function(word){
    this.wordsUsed.push(word);
  }

  this.hasWord = function(word){
    var bool = false;
    that.wordsUsed.forEach(function(item){
      if (item === word){
        bool = true;
      }
    })
    return bool;
  }

})


// app.service('userCall', [function()])
//
// app.service('leaderCall', [function()])
