angular.module('myApp.main.compare', ['ui.router'])

.config(function ($stateProvider) {

  $stateProvider
    .state('myApp.main.compare', {
      url: '/compare',
      templateUrl: 'compare/compare.tpl.html',
      controller: 'CompareController'
    });
})
.controller('CompareController', function ($scope, $http) {
  var endPoints = {
    user           : '1/user',
    names          : '1/names/',
    risks          : '1/risks/',
    carriers       : '1/carriers/',
    drug_responses : '1/drug_responses/',
    traits         : '1/traits/'
  };

  //d47db20d9412b18c9358d668bcae09e4

  $http.jsonp('http://www.23andme.com/' + endPoints.user,{
            headers : {
                'Authorization' : 'Bearer d47db20d9412b18c9358d668bcae09e4'
            }
          })
  .success(function(result) {
    $scope.documents = result.data;
  });


// $http.jsonp(url)
//     .success(function(data){
//         console.log(data.found);
//     });

  $scope.notes = [];
});
