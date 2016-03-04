app.controller('SearchController', ['$scope', 'gifCall', '$location', function($scope, gifCall, $location){
  $scope.searchForAGif = function(){
    gifCall.searchForAGif($scope.searchTerm).then(function(payload){
      gifCall.setGifs(payload.data);
      $location.path('/game')
    });
  }
}])


app.controller('GameController', ['$scope', 'gifCall', function($scope, gifCall){
  $scope.gifs = gifCall.gifArray;
  console.log($scope.gifs);

  $scope.isSelected;

  $scope.toggleSelected = function(item){
    $scope.isSelected = item;
  }

  $scope.checkAnswer = function(){
    console.log($scope.gifs[$scope.isSelected].answer);
  }

}])
