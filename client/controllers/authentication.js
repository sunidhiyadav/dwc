DWCAppModule.controller('AuthenticateController', function($scope, $rootScope, $location, authenticationService, userFactory) {

  var vm = this;
//console.log("got here");
//console.log(this);

//var adminsettime = {};

  userFactory.gettimesetting(function(data){
  //  console.log(data.from);
      $scope.from = data.from;
      $scope.to = data.to;
      //  console.log($scope.from);
    // adminsettime = {
    //   from : data.from,
    //   to : data.to
    // }
    //  $location.url("/jobs");
  });



    vm.isLoggedIn = authenticationService.isLoggedIn();
  console.log(vm.isLoggedIn);
    vm.currentUser = authenticationService.currentUser();
  console.log(vm.currentUser);
    if(vm.currentUser == undefined){
      vm.currentUser = "";
        $rootScope.loggedUser = "";
    } else {
        $rootScope.loggedUser = vm.currentUser.email;
    }

  //  console.log(vm.currentUser.email);
    //console.log(vm.currentUser);
  //  $location.path('/authenticateUser');



  });
