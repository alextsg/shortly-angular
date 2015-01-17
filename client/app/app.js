angular.module('shortly', [
  'shortly.services',
  'shortly.links',
  'shortly.shorten',
  'shortly.auth',
  'shortly.clicks',
  'ngRoute'
])
.config(function($routeProvider, $httpProvider) {
  $routeProvider
    .when('/signin', {
      templateUrl: 'app/auth/signin.html',
      controller: 'AuthController'
    })
    .when('/signup', {
      templateUrl: 'app/auth/signup.html',
      controller: 'AuthController'
    })
    .when("/signout", {
      templateUrl: 'app/auth/signout.html',
      controller: "AuthController"
    })
    .when('/links', {
      templateUrl: 'app/links/links.html',
      controller: 'LinksController'
    })
    .when('/shorten', {
      templateUrl: 'app/shorten/shorten.html',
      controller: 'ShortenController'
    })
    .when('/link/:code', {
      templateUrl: "app/clicks/clicks.html",
      controller: "ClicksController"
    })
    .otherwise({
      redirectTo: '/links'
    })
    // Your code here

    // We add our $httpInterceptor into the array
    // of interceptors. Think of it like middleware for your ajax calls
    $httpProvider.interceptors.push('AttachTokens');
})
.factory('AttachTokens', function ($window) {
  console.log("authentication part")
  // this is an $httpInterceptor
  // its job is to stop all out going request
  // then look in local storage and find the user's token
  // then add it to the header so the server can validate the request
  var attach = {
    request: function (object) {
      var jwt = $window.localStorage.getItem('com.shortly');
      console.log(jwt)
      if (jwt) {
        object.headers['x-access-token'] = jwt;
      }
      object.headers['Allow-Control-Allow-Origin'] = '*';
      return object;
    }
  };
  return attach;
})
.run(function ($rootScope, $location, Auth) {
  console.log(Auth.isAuth());
  // here inside the run phase of angular, our services and controllers
  // have just been registered and our app is ready
  // however, we want to make sure the user is authorized
  // we listen for when angular is trying to change routes
  // when it does change routes, we then look for the token in localstorage
  // and send that token to the server to see if it is a real user or hasn't expired
  // if it's not valid, we then redirect back to signin/signup
  $rootScope.$on('$routeChangeStart', function (evt, next, current) {
    if(next.templateUrl === 'app/auth/signup.html' || next.templateUrl === 'app/links/links.html') {

    }

    //console.log("next.$$route: ", next.$$route);
    //console.log("next.$$route.authenticate: ", next.$$route.authenticate);
    //console.log("truth: ", next.$$route && next.$$route.authenticate && !Auth.isAuth());
    else if (next.$$route && next.$$route.authenticate === undefined && !Auth.isAuth()) {
      console.log('redirecting');
      $location.path('/signin');
    }
  });
});
