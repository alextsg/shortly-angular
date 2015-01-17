angular.module('shortly.shorten', [])

.controller('ShortenController', function ($scope, $http, $location, Links) {
  $scope.link = {};
  $scope.addLink = function(link){
    console.log('scopeurl', $scope.url);
    $http.post('/api/links', {url: $scope.url}).success(function(data){
      $scope.link = data;
      console.log('success', data);
      $scope.url = null;
    }).error(function(data){
      console.log('error', data);
    })
  };
});
