var app = angular.module('guessdagiph', ['ngRoute', 'timer', 'ngResource'])

app.config(function($routeProvider, $locationProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/giphsearch.html',
      controller: 'SearchController'
    })
    .when('/game', {
      templateUrl: 'views/game.html',
      controller: 'GameController'
    })
    .when('/gameover', {
      templateUrl: 'views/gameover.html',
      controller: 'GameOverController'
    })
    .when('/signin', {
      templateUrl: 'views/signin.html',
      controller: 'UserController'
    })
    .when('/signup', {
      templateUrl: 'views/signup.html',
      controller: 'UserController'
    })
    .when('/users/:username', {
      templateUrl: 'views/user.html',
      controller: 'UserInfoController'
    })
    .when('/logout', {
      templateUrl: 'views/loggedout.html',
      controller: 'LogOutController'
    })
    $locationProvider.html5Mode(true);
})
