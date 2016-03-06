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
      $location.path('/')
    }else{
      alert('You Fail!')
      $location.path('/gameover')
    }
  }
}])


app.controller('GameOverController',  ['$scope', 'gameService', function($scope, gameService){
 $scope.showSignUp = function(){
   return 'views/options/signmeup.html'
 }

 }])

 app.controller('UserController',  ['$scope', 'userService', '$location', '$routeParams', function($scope, userService, $location, $routeParams ){
  $scope.createUser = function(){
    userService.createUser($scope.newUser).then(function(response){
      if(response.status === 200){
        localStorage.setItem('giphyRunToken', response.data.token)
        $location.path('/users/' + $scope.newUser.username)
      }
    })
  }
  $scope.signIn = function(){
    userService.signIn($scope.user).then(function(response){
      if(response.status === 200){
        localStorage.setItem('giphyRunToken', response.data.token);
        $location.path('/users/' + $scope.user.username);
      }
    })
  }
 }])

 app.controller('UserInfoController', ['$scope', '$location', '$routeParams', 'userService', function($scope, $location,$routeParams, userService){
   userService.getInfo($routeParams.username).then(function(response){
      $scope.scores = response.data
   }, function(response){
     $location.path('/signup')
   })
 }])
