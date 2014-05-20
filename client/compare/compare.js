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

  $scope.combine = function($user1, $user2) {
    $scope.combined = {};
    $scope.combined.firstUser  = $user1.name;
    $scope.combined.SecondUser = $user2.name;
    $scope.combined.risks = [];
    var risk;

    for (var i = 0; i < $user1.risks.length; i++) {
      var firstWins = 'Draw';
      if(+$user1.risks[i].risk > +$user2.risks[i].risk) {
        firstWins = 'Lose';
      } else if(+$user1.risks[i].risk < +$user2.risks[i].risk) {
        firstWins = 'Win';
      }

      risk = {
        description    : $user1.risks[i].description,
        firstRisk      : +$user1.risks[i].risk,
        secondRisk     : +$user2.risks[i].risk,
        populationRisk : +$user1.risks[i].population_risk,
        firstWins      : firstWins
      };
      $scope.combined.risks.push(risk);
    }

    console.log($user1.name);
  };

  getUserData($cookies.token1, $http, $scope.user1);
  getUserData($cookies.token2, $http, $scope.user2);
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
          $user.risks = result.data.risks.sort(function(a,b){
            if (a.description > b.description){
              return -1;
            } else if (a.description < b.description) {
              return 1;
            }
            return 0;
          });
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
