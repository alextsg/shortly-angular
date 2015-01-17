angular.module('shortly.links', [])

.controller('LinksController', function ($scope, $http, Links) {
  $scope.data = {};
  $scope.data.links = {};
  $scope.getLinks = function(){
    $http.get('/api/links').success(function(data){
      $scope.data.links = data;
    }).error(function(data){
      console.log('error', data);
    })
  };
  $scope.getLinks();
});
