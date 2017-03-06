DWCAppModule.controller('employersController', function($scope, $routeParams, $location, authenticationService) {

$scope.loggeduser = authenticationService.currentUser();


  });
