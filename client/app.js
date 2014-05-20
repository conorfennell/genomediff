(function (angular) {
  "use strict";
  angular.module('myApp', [
    'ngCookies',
    'ui.router',
    'ngAnimate',
    'fx.animations'
 ,'myApp.main'])
  .config(function ($stateProvider) {
    $stateProvider
      .state('myApp', {
        abstract: true,
        template: '<ui-view></ui-view>'
      });
  })
  .run(function ($state) {
    $state.transitionTo('myApp.main');
  });
}(angular));
