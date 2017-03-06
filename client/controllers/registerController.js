
DWCAppModule.controller('registerController', function($scope, $rootScope, $location, $cookies,$location, $routeParams, authenticationService) {
    console.log($scope.showModal);
    $scope.showModal = true;
      console.log($scope.showModal);
var userdetails = {};
    $scope.cancel = function() {
        $scope.showModal = false;
        $location.path('displayuser');
    };

    $scope.submitRegister = function() {
        console.log("hereeee");
      //  $scope.firstName = $cookies.get("firstName");
        //  console.log($scope.firstName);
        var user_details = {
            firstname: $scope.job.firstName,
            lastname: $scope.job.lastName,
            username: $scope.job.username,
            companyname: $scope.job.companyName,
            address: $scope.job.physicalAddress,
            city: $scope.job.city,
              zipcode: $scope.job.zip,
                phone: $scope.job.phoneNumber,
            email: $scope.job.emailAddress,
            password: $scope.job.password
        }
//console.log(user_details);
$rootScope.userdetails = user_details;


    //     IngredientsFactory.register(user_details, function(data) {
    //
    //       if (data.data.errors){
    //   $scope.errors = data.data.errors;
    // }
    // else{
    //
    //   $scope.user = "";
    //
    //   $scope.showModal = false;
    //
    // }
    //
    //     }, function(err) {
    //       console.log("checking error message");
    //       console.log(data.data.errors);
    //
    //     })
//console.log("here");
authenticationService.register(user_details)
              .error(function(err){
            //  alert(err);
              })
              .then(function(data){
                console.log(data);
                $scope.showModal = false;

            //  $location.path('login');
                $location.url('/employers/login')

              });
    }

});
