angular.module('myApp.main.compare', ['ui.router', 'ngCookies'])

.config(function ($stateProvider) {

  $stateProvider
    .state('myApp.main.compare', {
      url: '/compare',
      templateUrl: 'compare/compare.tpl.html',
      controller: 'CompareController'
    });
})
.controller('CompareController', function ($scope, $http, $cookies) {
  $scope.user1 = {};
  $scope.user2 = {};

  getUserData($cookies.token1, $http, $scope.user2);
  getUserData($cookies.token2, $http, $scope.user1);
});

var endPoints = {
  user           : '/user/',
  names          : '/user/names/',
  risks          : '/user/risks/',
  carriers       : '/user/carriers/',
  drug_responses : '/user/drug_responses/',
  traits         : '/user/traits/'
};

var getUserData = function(token, $http, $user){
  $http.get(endPoints.user + '?token=' + token)
    .then(function(result){
      var profileId = result.data.profiles[0].id


      $http.get(endPoints.names + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.name = result.data.first_name + ' ' + result.data.last_name ;
        });

      $http.get(endPoints.risks + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.risks = result.data.risks;
        });

      $http.get(endPoints.carriers + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.carriers = result.data.carriers;
        });

      $http.get(endPoints.drug_responses + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.drug_responses = result.data.drug_responses;
        });

      $http.get(endPoints.traits + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.traits = result.data.traits;
        });
    });
}
