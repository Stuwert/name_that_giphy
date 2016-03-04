//this is our inital express api call

app.service('gifCall', ['$http', function($http){
  var that = this;
  this.gifArray = [];
  this.searchForAGif = function(searchTerm){
    // return $http.get('https://namethatgiphyapi.herokuapp.com/api/gif/' + searchTerm)
    return $http.get('http://localhost:3000/api/gif/' + searchTerm)
  }

  this.setGifs = function(arr){
    this.gifArray = arr;
  }

}])


// app.service('userCall', [function()])
//
// app.service('leaderCall', [function()])
