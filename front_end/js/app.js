var app = angular.module('guessdagiph', ['ngRoute'])

app.config(function($routeProvider){
  $routeProvider
    .when('/', {
      templateUrl: 'views/giphsearch.html',
      controller: 'SearchController'
    })
    .when('/game', {
      templateUrl: 'views/game.html',
      controller: 'GameController'
    })
})
