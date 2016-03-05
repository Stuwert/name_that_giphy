app.controller('SearchController', ['$scope', 'gifCall', '$location', 'gameService', function($scope, gifCall, $location, gameService){
  $scope.searchForAGif = function(){
    if(gameService.hasWord($scope.searchTerm)){
      alert("Don't game the system mammajama.")
    }else{
      gameService.addWord($scope.searchTerm);
      gifCall.searchForAGif($scope.searchTerm).then(function(payload){
        gifCall.setGifs(payload.data);
        $location.path('/game')
      });
    }
  }
  $scope.score = gameService.score;
}])


app.controller('GameController', ['$scope', 'gifCall', 'gameService', '$location', function($scope, gifCall, gameService, $location){
  $scope.gifs = gifCall.gifArray;
  console.log($scope.gifs);
  $scope.score = gameService.score;
  $scope.isSelected;

  $scope.toggleSelected = function(item){
    $scope.isSelected = item;
  }

  $scope.checkAnswer = function(){
    if ($scope.gifs[$scope.isSelected].answer){
      alert("Correct!")
      gameService.incrementScore();
    }else{
      alert('You Fail!')
      gameService.resetScore();
    }
    $location.path('/')
  }
}])


app.controller('GameOverController', ['$scope', function($scope, )])
