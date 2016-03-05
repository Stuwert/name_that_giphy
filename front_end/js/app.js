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
    $locationProvider.html5Mode(true);
})
