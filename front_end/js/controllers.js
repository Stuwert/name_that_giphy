app.controller('ParentController', ['$scope', function($scope){
  $scope.isLoggedIn = localStorage.getItem('giphyRunUserName')
}])

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


app.controller('GameController', ['$scope', 'gifCall', 'gameService', '$location',  function($scope, gifCall, gameService, $location){
  $scope.gifs = gifCall.gifArray;
  $scope.score = gameService.score;
  $scope.isSelected;
  $scope.searchTerm = gifCall.searchTerm;

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

  $scope.timerRunning = true;

  $scope.$on('timer-stopped', function(event, data){
    if (!$scope.isSelected) {
      $scope.isSelected = getRand(4)
    }
    $scope.checkAnswer();
    $scope.$apply();
  })

}])


app.controller('GameOverController',  ['$scope', 'gameService', function($scope, gameService){
  $scope.score = gameService.score;
  if($scope.$parent.isLoggedIn && gameService.score > 0){
    gameService.setScore($scope.$parent.isLoggedIn).then(function(){
      console.log('score reseting');
      gameService.resetScore();
      gameService.clearWordsUsed();
    }, function(response){
      console.log("is this an error? ", response);
    })
  }
 $scope.showSignUp = function(){
   if ($scope.$parent.isLoggedIn){
    return 'views/options/again.html'
   }else{
    return 'views/options/signmeup.html'
   }
 }

 }])

 app.controller('UserController',  ['$scope', 'userService', '$location', '$routeParams', 'gameService', function($scope, userService, $location, $routeParams, gameService ){
  $scope.createUser = function(){
    userService.createUser($scope.newUser).then(function(response){
      if(response.status === 200){
        localStorage.setItem('giphyRunToken', response.data.token)
        localStorage.setItem('giphyRunUserName', $scope.newUser.username)
        $scope.$parent.isLoggedIn = $scope.newUser.username;
        gameService.setScore($scope.$parent.isLoggedIn).then(function(response){
          gameService.resetScore();
          gameService.clearWordsUsed();
          $location.path('/users/' + $scope.newUser.username)
        })
      }
    }, function(response){
      alert('Sign up failed, please try again')
    })
  }
  $scope.signIn = function(){
    userService.signIn($scope.user).then(function(response){
      if(response.status === 200){
        localStorage.setItem('giphyRunToken', response.data.token);
        localStorage.setItem('giphyRunUserName', $scope.user.username);
        $scope.$parent.isLoggedIn = $scope.user.username;
        if(gameService.score > 0){
          gameService.setScore($scope.$parent.isLoggedIn).then(function(response){
            gameService.resetScore();
            gameService.clearWordsUsed();
            $location.path('/users/' + $scope.user.username);
          })
        }else{
          $location.path('/users/' + $scope.user.username);
        }
      }
    }, function(response){
      alert('Sign in failed, please try again')
    })
  }
 }])

 app.controller('UserInfoController', ['$scope', '$location', '$routeParams', 'userService', function($scope, $location,$routeParams, userService){
   userService.getInfo($routeParams.username).then(function(response){
     console.log(response);
      $scope.scores = response.data
   }, function(response){
     $location.path('/signup')
   })
 }])

 app.controller('LogOutController', ['$scope', '$location', function($scope, $location){
   $scope.$parent.isLoggedIn = false;
   localStorage.removeItem('giphyRunToken');
   localStorage.removeItem('giphyRunUserName')
 }])

 function getRand(n){
   return Math.trunc(Math.random() * 4);
 }
