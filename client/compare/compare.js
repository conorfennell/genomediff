angular.module('myApp.main.compare', ['ui.router', 'ngCookies', 'ui.bootstrap'])

.config(function ($stateProvider) {

  $stateProvider
    .state('myApp.main.compare', {
      url: '/compare',
      templateUrl: 'compare/compare.tpl.html',
      controller: 'CompareController'
    });
})
.controller('CompareController', function ($scope, $http, $cookies) {
  $scope.showSpinner = true;
  $scope.showButton = false;
  $scope.showTable = false;

  var map1 = new Datamap({
    element: document.getElementById('container1'),
  });

  var map2 = new Datamap({
    element: document.getElementById('container2'),
  });

  $scope.user1 = {};
  $scope.user2 = {};
  $scope.alerts = [];

  $scope.addAlert = function(msg) {
    $scope.alerts.push(msg);
  };

  $scope.closeAlert = function(index) {
    $scope.alerts.splice(index, 1);
  };

  $scope.combine = function($user1, $user2) {
    $scope.combined = {};
    $scope.combined.firstUser  = $user1.name;
    $scope.combined.SecondUser = $user2.name;
    $scope.combined.risks = [];
    $scope.combined.carriers = [];
    var risk;
    var riskCount = 0;
    var carrierCount = 0;


    map1.updateChoropleth({
      IRL :'#0fa0fa',
      GBR :'#0fa0fa',
      FRA :'#0fa0fa',
    });


    map2.updateChoropleth({
      IRL :'#0fa0fa',
      GBR :'#0fa0fa',
      FIN :'#0fa0fa',
      POL :'#0fa0fa'
    });

    $scope.showButton = false;

    for (var i = 0; i < $user1.risks.length; i++) {
      var firstWins = 'Equal';
      if(+$user1.risks[i].risk > +$user2.risks[i].risk) {
        firstWins = 'Higher';
        riskCount++;
      } else if(+$user1.risks[i].risk < +$user2.risks[i].risk) {
        firstWins = 'Less';
        riskCount--;
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
    $scope.combine.riskCount = riskCount;
    for (var i = 0; i < $user1.carriers.length - 1; i++) {
      var firstWins = 'Equal';
      if(+$user1.carriers[i].mutations > +$user2.carriers[i].mutations) {
        firstWins = 'Higher';
        carrierCount++;
      } else if(+$user1.carriers[i].mutations < +$user2.carriers[i].mutations) {
        firstWins = 'Less';
        carrierCount--;
      }

      carrier = {
        description      : $user1.carriers[i].description,
        firstMutations   : +$user1.carriers[i].mutations,
        secondMutations  : +$user2.carriers[i].mutations,
        firstWins        : firstWins
      };
      $scope.combined.carriers.push(carrier);
    }

    var diseaseMessage = {};
    var carrierMessage = {};
    var neanderthalMessage = {};
    var heroinMessage = {};
    var livingto100Message = {};



    if(riskCount < 0) {
      diseaseMessage.type = 'success';
      diseaseMessage.msg = $user1.name + ' is less prone to diseases than ' + $user2.name;
    } else if (riskCount > 0) {
      diseaseMessage.type = 'danger';
      diseaseMessage.msg = $user2.name + ' is less prone to diseases than ' + $user1.name;
    } else {
      diseaseMessage.msg = ' Both as likely to get diseased'
    }

    if(carrierCount < 0) {
      carrierMessage.type = 'success';
      carrierMessage.msg = $user1.name + ' has less inherited conditions than ' + $user2.name;
    } else if (carrierCount > 0) {
      carrierMessage.type = 'danger';
      carrierMessage.msg = $user2.name + ' has less inherited conditions than ' + $user1.name;
    } else {
      carrierMessage.msg = ' Both have the same number of inherited conditions'
    }
    if (+$user1.neanderthal.proportion > +$user2.neanderthal.proportion) {
      var diff = +$user1.neanderthal.proportion - +$user2.neanderthal.proportion;
      neanderthalMessage.type = 'success';
      neanderthalMessage.msg = $user1.name + ' is more rocking with ' + (diff*100).toFixed(2) + '% greater neanderthal dna than ' + $user2.name;
    } else  if (+$user1.neanderthal.proportion < +$user2.neanderthal.proportion) {
      diff = +$user2.neanderthal.proportion - +$user2.neanderthal.proportion;
      neanderthalMessage.type = 'danger';
      neanderthalMessage.msg = $user2.name + ' is more rocking with ' + (diff*100).toFixed(2) + '% greater neanderthal dna than ' + $user1.name;
    } else{
      neanderthalMessage.msg = $user2.name + ' has  the same %  of neanderthal dna as ' + $user1.name;

    }

    heroinMessage = {
      msg : 'Both have the same odds of getting addicted to heroin'
    }

    livingto100Message = {
      type  : 'success',
      msg   : $user1.name + ' is more likely to live to 100 than ' + $user2.name
    }

    $scope.addAlert(neanderthalMessage);
    $scope.addAlert(diseaseMessage);
    $scope.addAlert(carrierMessage);
    $scope.addAlert(heroinMessage);
    $scope.addAlert(livingto100Message);

    $scope.showTable = true;
  };

  getUserData($cookies.token1, $http, $scope.user1);
  getUserData($cookies.token2, $http, $scope.user2, $scope);
});

var endPoints = {
  user           : '/user/',
  names          : '/user/names/',
  risks          : '/user/risks/',
  carriers       : '/user/carriers/',
  drug_responses : '/user/drug_responses/',
  neanderthal    : '/user/neanderthal/',
  ancestry       : '/user/ancestry/',
  traits         : '/user/traits/'
};

var getUserData = function(token, $http, $user, $scope){
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
          $user.carriers = result.data.carriers.sort(function(a,b){
            if (a.description > b.description){
              return -1;
            } else if (a.description < b.description) {
              return 1;
            }
            return 0;
          });
        });

      $http.get(endPoints.drug_responses + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.drug_responses = result.data.drug_responses;
        });

      $http.get(endPoints.neanderthal + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.neanderthal = result.data.neanderthal;
        });

      $http.get(endPoints.ancestry + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.ancestry = result.data.ancestry;
        });

      $http.get(endPoints.traits + '?token=' + token + '&profileId=' + profileId  )
        .then(function(result){
          $user.traits = result.data.traits;
          if($scope !== undefined) {
            $scope.showSpinner = false;
            $scope.showButton = true;
          }
        });
    });
}
