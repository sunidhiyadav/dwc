DWCAppModule.controller('logoutController', function($scope, $routeParams, $window, $location, authenticationService) {
  console.log("logout controller");


  authenticationService.logout();
    $window.location = 'index.html'
  	//$location.url('/');
  //$window.location = 'index.html'


  });
