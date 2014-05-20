angular.module('myApp.main.login', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('myApp.main.login', {
      url: '/login',
      templateUrl: 'login/login.tpl.html',
      controller: 'NoteController'
    });
})
.controller('NoteController', function ($scope) {

});
