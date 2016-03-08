//this is our inital express api call
var theCall = 'http://localhost:3000'
// var theCall = 'https://namethatgiphyapi.herokuapp.com'


app.service('gifCall', ['$http', function($http){
  var that = this;
  this.gifArray = [];
  this.searchTerm;
  this.searchForAGif = function(searchTerm){
    that.searchTerm = searchTerm;
    return $http.get(theCall + "/api/gif/" + searchTerm)
  }

  this.setGifs = function(arr){
    this.gifArray = arr;
  }

}])


app.service('gameService', ['$http', function($http){
  this.score = 0;
  var that = this;
  this.incrementScore = function(){
    //put timer in here, everytime score is incremeted restart timer
    that.score++;
  }
  this.resetScore = function(){
    that.score = 0;
  }
  this.wordsUsed = [];

  this.addWord = function(word){
    this.wordsUsed.push(word);
  }
  this.clearWordsUsed = function(){
    that.wordsUsed = [];
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

  this.setScore = function(username){
    var token = localStorage.getItem('giphyRunToken');
    return $http.post(theCall + '/userinfo/' + username, {'score' : that.score}, {headers: {'token': token }})
  }



  //$scope.timer = function()
  // everytime score update timer
  //this.timer = 5 secs
  // if timer =0 stop game shift location
  //

}])

app.service('userService', ['$http', function($http){

  this.signIn = function(data){
    return $http.post(theCall + '/users/signin', data)
  }

  this.createUser = function(data){
    return $http.post(theCall + '/users/signup', data)
  }

  this.getInfo = function(username){
    var token = localStorage.getItem('giphyRunToken');
    return $http.get(theCall + '/userinfo/' + username, {headers: {'token': token}})
  }

}])
