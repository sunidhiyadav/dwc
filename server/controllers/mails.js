var mongoose = require("mongoose");
var path			 		= require('path');
var Mail = mongoose.model("Mail");
var nodemailer = require('nodemailer');
var hbs = require('nodemailer-express-handlebars');
var EmailTemplate = require('email-templates').EmailTemplate;


var templatesDir = path.resolve(__dirname, '../../client/templates');



module.exports = {
    index: function(req, res) {
        Mail.find({}, function(err, mails) {
            if (err) {
                res.json({ error: err });
            } else {
                res.json(mails);
            }
        });
    },
    create: function(req, res, next) {
        var newMail = new Mail(
        	{ 	firstName: req.body.firstName,
                lastName: req.body.lastName,
                emailAddress: req.body.emailAddress,
                phoneNumber:req.body.phoneNumber,
                message:req.body.message,
                contactType:req.body.contactType
            });
            //console.log(newMail);
        newMail.save(function(err, data) {
            if (err) {
                res.json({ error: err });
            } else {
              //  res.json({ data: data }); // change later to simple success message
            //  var string = encodeURIComponent('something that would break');
                    //res.redirect('/sendemail?valid=' + string);
                     req.dataProcessed = data;
                    return next();
            }
        });
    },
    update: function(req, res) {
        Mail.findOne({ _id: req.params.id }, function(err, mail) {
            if (err) {
                res.json({ error: err }); // could not locate the entry
            }
            mail.firstName = req.body.firstName;
            mail.lastName = req.body.lastName;
            mail.emailAddress = req.body.emailAddress;
            mail.phoneNumber = req.body.phoneNumber;
            mail.message = req.body.message;
            mail.contactType = req.body.contactType;
            mail.answeredBy = req.body.answeredBy;
            mail.save(function(err) {
                if (err) {
                    res.json({ error: err }); // could not save into database
                } else {
                    res.json({ success: "update success" });


                }
            })

        });
    },
    delete: function(req, res) {
        Mail.remove({ _id: req.params.id }, function(err, mail) {
            if (err) {
                res.json({ error: err });
            } else {
                res.json({ success: "succesfully deleted mail" })
            }
        });
    },
    show: function(req, res) {
        Mail.findOne({ _id: req.params.id }, function(err, mail) {
            if (err) {
                res.json({ error: err }); // could not find mail
            } else {
                res.json(mail);
            }
        })
    },

    send: function(req, res) {
  var template = new EmailTemplate(path.join(templatesDir, 'contact-request'));

  var context = req.dataProcessed;
  console.log(context.firstName);



  var locals = {
  firstName: context.firstName,
  lastName: context.lastName,
  emailAddress: context.emailAddress,
  phoneNumber: context.phoneNumber,
  message: context.message
};

var transporter = nodemailer.createTransport("SMTP", {
  service: 'Gmail',
     auth: {

      //   XOAuth2: {
      //     user: 'nandhini0716@gmail.com',
      //     clientId: '149432343528-m3eeolpbioj2tlq9ucq1ldenumpt0fbo.apps.googleusercontent.com',
      //     clientSecret: 'Mv5qQGP8Zt3ChXw-t4FV2Gjx',
      //     refreshToken: '1/SJPcbbGe2XX_mH1eXnosxFl94meLzX0XvuqqNc4Xilo'
      // }
      XOAuth2: {
        user: 'webmasterfromdwc@gmail.com',
        clientId: '39884608565-o8f0kcq71hs26irgkkb8h655p4ve381e.apps.googleusercontent.com',
        clientSecret: 'GpDWuFAxsuA-51VRzyQaI4Lh',
        refreshToken: '1/2Fymg6-fV_DMf2MtP_VOC3tdDYRtxqvTgLpmLLdhVbF1WKSnfKXdGH2o-lQtbJBm'
    }
     }
});

var fromEmail = 'webmasterfromdwc@gmail.com';
  var toEmail = 'nandhini0716@gmail.com';

console.log(fromEmail);

  // transporter.use('compile', hbs({
  //     viewPath : 'partials/email',
  //     extName : '.hbs'
  // }));
  template.render(locals, function (err, results) {
  		if (err) {
  			return console.error(err);
  		}
   transporter.sendMail({
      from: fromEmail,
      to: toEmail,
      subject: 'Contact Us request from'+ locals.firstName+' via DWC website',
			html: results.html,
			text: results.text

      // html: '<p><b>Success! Your request was submitted!</b></p>'
  }, function(error, response){
      if(error){
          console.log('Failed in sending mail');
          console.dir({success: false, existing: false, sendError: true});
          console.dir(error);
          res.end('Failed in sending mail');
      }else{
          console.log('Successful in sedning email');
          console.dir({success: true, existing: false, sendError: false});
          console.dir(response);
          res.end('Successful in sedning email');
      }
  });

        transporter.close();
      });
    }
}
