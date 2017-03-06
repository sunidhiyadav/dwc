DWCAppModule.service('authenticationService', function($http, $window) {

  var saveToken = function (token) {
    $window.localStorage['mean-token'] = token;
  };

  var getToken = function () {
    return $window.localStorage['mean-token'];
  };

  var isLoggedIn = function() {
    var token = getToken();
    var payload;

    if(token){
      payload = token.split('.')[1];
      payload = $window.atob(payload);
      payload = JSON.parse(payload);

//console.log(payload);
      return payload.exp > Date.now() / 1000;
    } else {
      return false;
    }
  };
console.log(isLoggedIn);
  var currentUser = function() {
      if(isLoggedIn()){
        var token = getToken();
        var payload = token.split('.')[1];
        payload = $window.atob(payload);
        payload = JSON.parse(payload);
          //console.log(token);
        console.log(payload);
        return {
          email : payload.email,
          name : payload.firstname
        };
      }
    };


    register = function(user) {
      return $http.post('/register', user).success(function(data){
        saveToken(data.token);
      });
    };

    login = function(user) {

      return $http.post('/userLogin', user).success(function(data) {
        saveToken(data.token);
      });
    };

    logout = function() {
      console.log("logout");
      $window.localStorage.removeItem('mean-token');
      return;
    };

    return {
      currentUser : currentUser,
      saveToken : saveToken,
      getToken : getToken,
      isLoggedIn : isLoggedIn,
      register : register,
      login : login,
      logout : logout
    };


});
