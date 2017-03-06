var mongoose = require('mongoose');
var crypto = require('crypto');
  var jwt = require('jsonwebtoken');



var usersSchema = new mongoose.Schema({
    firstname : String,
    lastname : String,

    companyname : String,
    address : String,
    city : String,
    zipcode : String,
    phone : String,
    email : String,
    username : {
      type : String,
      unique : true },


      hash: String,
    salt: String,


});

// usersSchema.methods.ping = function(){
//   console.log(this);
// }

usersSchema.methods.setPassword = function(password){
  this.salt = crypto.randomBytes(16).toString('hex');
  this.hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
};

usersSchema.methods.validPassword = function(password) {
  var hash = crypto.pbkdf2Sync(password, this.salt, 1000, 64).toString('hex');
  return this.hash === hash;
};


usersSchema.methods.generateJwt = function() {
  var expiry = new Date();
  expiry.setDate(expiry.getDate() + 7);

  return jwt.sign({
    _id: this._id,
    email: this.email,
    name: this.name,
    exp: parseInt(expiry.getTime() / 1000),
  }, "MY_SECRET"); // DO NOT KEEP YOUR SECRET IN THE CODE!
};

mongoose.model('Employer', usersSchema);
