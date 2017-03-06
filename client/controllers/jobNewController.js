DWCAppModule.controller('jobNewController', function($scope,jobsFactory, authenticationService,$cookies , $location, $rootScope) {
/*
  OUR $scope.create function goes here <-- $scope because we need to access this method
  with ng-submit or ng-click (from the form in the previous assignment).
  Want to all of the jobs when we get back?  We can re-run index.
*/


  var currentUserdata = authenticationService.currentUser();
//console.log(currentUserdata.email);
//debugger;
// var currentUser = {
//   name : currentUserdata.email
// }
if(currentUserdata){
  var currentUser = {
    name : currentUserdata.email
  }
  $scope.loggeduser = currentUserdata.email;
//  console.log(currentUserdata.name);
}

jobsFactory.populateUserData(currentUser, function(data){
  //  $location.url("/jobs");
  console.log(data);
});


  var logged_in_user = $cookies.get('logged_user');
  $scope.firstName = $cookies.get("firstName");
  $scope.userLevel = $cookies.get("userLevel");
  $scope.lastName = $cookies.get("lastName");
  $scope.emailAddress = $cookies.get("emailAddress");
/*  if(!logged_in_user){
    console.log("not loggged in");
    //$location.url('/staff/login')

    //return $location.path('/staff/login').replace();

    return $location.path('/employers/reserveworker').replace();

  }*/

  $scope.create = function(){
    jobsFactory.createJob($scope.job, function(){
        $location.url("/jobs");
    });
  }
  $scope.createForStaff = function(){
    jobsFactory.createJobForStaff($scope.job, function(){
        $location.url("/jobs");
    });
  }

  $scope.logout = function(){
		$cookies.remove('logged_user');
		$location.url('/');
	}
});
