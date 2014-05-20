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

  var endPoints = {
    user           : '/user/',
    names          : '/user/names/',
    risks          : '/user/risks/',
    carriers       : '/user/carriers/',
    drug_responses : '/user/drug_responses/',
    traits         : '/user/traits/'
  };

  $scope.documents = 'wahoo';

  $http.get(endPoints.user)
    .then(function(result){
      console.log(result.data);
      $cookies.profileId = result.data.profiles[0].id


      $http.get(endPoints.names + '?profileId=' + $cookies.profileId  )
        .then(function(result){
          console.log(result.data);
          $scope.documents = result.data.first_name + ' ' + result.data.last_name ;
        });

      $http.get(endPoints.risks + '?profileId=' + $cookies.profileId  )
        .then(function(result){
          console.log(result.data);
          $scope.risks = result.data.risks;
        });

      $http.get(endPoints.carriers + '?profileId=' + $cookies.profileId  )
        .then(function(result){
          console.log(result.data);
          $scope.carriers = result.data.carriers;
        });

      $http.get(endPoints.drug_responses + '?profileId=' + $cookies.profileId  )
        .then(function(result){
          console.log("DRUGS " + result.data);
          $scope.drug_responses = result.data.drug_responses;
        });

      $http.get(endPoints.traits + '?profileId=' + $cookies.profileId  )
        .then(function(result){
          console.log(result.data);
          $scope.traits = result.data.traits;
        });

      $scope.name = result.data.profiles[0].id;
    });

  $scope.notes = [];
});
