app.controller('SearchController', ['$scope', 'gifCall', function($scope, gifCall){
  $scope.searchForAGif = function(){
    gifCall.searchForAGif($scope.searchTerm);
  }
}])


app.controller('GameController', ['$scope', function($scope){

}])
