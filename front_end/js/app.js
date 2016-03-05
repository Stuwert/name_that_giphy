var app = angular.module('guessdagiph', ['ngRoute', 'ngResource'])

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
    $locationProvider.html5Mode(true);
})
