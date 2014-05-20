angular.module('myApp.main.login', ['ui.router', 'ngCookies', 'ui.bootstrap'])

.config(function ($stateProvider) {

  $stateProvider
    .state('myApp.main.login', {
      url: '/login',
      templateUrl: 'login/login.tpl.html',
      controller: 'LoginController'
    });
})
.controller('LoginController', function ($scope, $cookies) {

  $scope.showFirst = false;
  $scope.showFirstButton = true;
  $scope.showSecond = false;
  $scope.showSecondButton = true;
  $scope.alerts = [

  ];
  $scope.addAlert = function(msg) {
    $scope.alerts.push(msg);
  };

  if($cookies.token1 !== undefined){
    $scope.showFirstButton = false;
    var msg = {
      type    : 'success',
      msg : 'First user logged in'
    }
    $scope.addAlert(msg);
  }

  if($cookies.token2 !== undefined){
    $scope.showSecondButton = false;
    var msg = {
      type    : 'success',
      msg : 'Second user logged in'
    }
    $scope.addAlert(msg);
  }



});
