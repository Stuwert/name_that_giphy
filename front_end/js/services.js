//this is our inital express api call 

app.service('gifCall', ['$http', function($http){
  var that = this;
  this.gifArray = [];
  this.searchForAGif = function(searchTerm){
    $http.get('http://localhost:3000/api/gif/' + searchTerm)
    .then(function(payload){
      that.gifArray = payload.data;
      console.log(that.gifArray);
    })

  }
}])


// app.service('userCall', [function()])
//
// app.service('leaderCall', [function()])
