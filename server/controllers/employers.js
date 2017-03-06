var mongoose = require('mongoose');
var passport = require('passport');
    var Employer = mongoose.model('Employer');



function UsersController() {

  this.register = function(req, res){
    console.log("here");

    var employer = new Employer();

console.log(req.body);
 employer.firstname = req.body.firstname;
 employer.lastname = req.body.lastname;
  employer.username = req.body.username;
 employer.companyname = req.body.companyname;
  employer.address = req.body.address;
   employer.city = req.body.city;
  employer.zipcode = req.body.zipcode,
    employer.phone = req.body.phone,
   employer.email = req.body.email;
employer.setPassword(req.body.password);

		console.log('fourth: create function users controller /server/controllers/users.js');
			console.log("sending json back to user factory check browser console")
			// if(err){
      //
			// 	res.json({
      //                   errors: {
      //
      //                           message: "user name is already taken",
      //
      //
      //                   },
      //                   name: "Validation error"
      //               });
			// } else {
      //   console.log("here");
			// 	res.json(user);
			// }
      employer.save(function(err) {
    var token;
    token = employer.generateJwt();
    res.status(200);
    res.json({
      "token" : token
    });
  });
		// })
	}



    this.userdata = function(req, res) {
      console.log(req.body.username);
        Employer.findOne({
            email: req.body.name
        }, function(err, data) {
          if(err){
            console.log(err);
    				// console.log(err);
    				// res.json({
            //                 errors: {
            //
            //                         message: "user name is already taken",
            //
            //
            //                 },
            //                 name: "Validation error"
            //             });
    			} else {
            console.log(data);
    				res.json(data);
    			}
        })
    }



  this.userLogin = function(req, res) {


      passport.authenticate('local', function(err, user, info){
         var token;
             console.log("hello");

         // If Passport throws/catches an error
         if (err) {
           res.status(404).json(err);
           return;
         }

         // If a user is found
         if(user){
           console.log("found");
           token = user.generateJwt();
    
           res.status(200);
           res.json({
             "token" : token
           });
         } else {
           // If user is not found
        //   console.log(info);
           res.status(401).json(info);
         }
       })(req, res);

  }



}

    module.exports = new UsersController();
