var mongoose = require("mongoose");
var Time = mongoose.model("Time");

module.exports = {
  getTiming: function(req, res){
    	var user = new Time(req.body);
    user.save(function(err, users){
      if(err){
      } else{
        res.json(users);
        console.log(users);
      }
    });
  },

  getTime : function(req, res){
    	var user = new Time(req.body);
    //  db.lists.find({}).sort({$natural:-1}).limit(1).pretty()
    // user.find({}).sort({$natural:-1}).limit(1).pretty(), function(err, users){
    //   if(err){
    //   } else{
    //     res.json(users);
    //     console.log(users);
    //   }
    // };

    // Time.remove({}, function(err, data){
    //   if(err){
    //
    //   }
    //   else{
    //
    //   }
    // });

    Time.findOne({}, function(err, pages) {
        if (err) {
            res.json({ error: err });
        } else {
            res.json(pages);
            console.log(pages);
        }
    });
  }

}
