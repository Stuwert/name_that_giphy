//this is our inital express api call
var myLocal = 'http://localhost:3000'
// var location = 'https://namethatgiphyapi.herokuapp.com'


app.service('gifCall', ['$http', function($http){
  var that = this;
  this.gifArray = [];
  this.searchForAGif = function(searchTerm){
    return $http.get(myLocal + "/api/gif/" + searchTerm)
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

app.service('userService', ['$http', function($http){

  this.signIn = function(data){
    return $http.post(myLocal + '/users/signin', data)
  }

  this.createUser = function(data){
    return $http.post(myLocal + '/users/signup', data)
  }

  this.getInfo = function(username){
    var token = localStorage.getItem('giphyRunToken');
    console.log(token);
    return $http.get(myLocal + '/userinfo/' + username, {headers: {token: token}})
  }

}])
