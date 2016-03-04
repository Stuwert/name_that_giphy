app.service('gifCall', ['$http', function($http){
  this.searchForAGif = function(searchTerm){
    console.log("this hit");
    return $http.get('http://localhost:3000/api/gif/' + searchTerm);
  }
}])


// app.service('userCall', [function()])
//
// app.service('leaderCall', [function()])
