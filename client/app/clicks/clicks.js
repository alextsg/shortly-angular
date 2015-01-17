angular.module('shortly.clicks', [])

.controller('ClicksController', function ($scope, $http, Links, $routeParams) {
  console.log($routeParams.code)
  $scope.navToLink = function(){
    // $http.get('/api/links').success(function(data){
    //   $scope.data.links = data;
    // }).error(function(data){
    //   console.log('error', data);
    // })
  };
  $scope.navToLink();
});
