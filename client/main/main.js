(function (angular) {
  "use strict";
  angular.module('myApp.main', ['ui.router', 'myApp.main.login', 'myApp.main.compare'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('myApp.main', {
        url: '/main',
        templateUrl: 'main/main.tpl.html',
        controller: 'MainController'
      });
  })
  .controller('MainController', function ($state) {
    $state.transitionTo('myApp.main.login');
  });
}(angular));
