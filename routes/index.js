var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

router.use(bodyParser.urlencoded({extended: true}));
router.use(methodOverride(function(req, res){
  if(req.body && typeof req.body === 'object' && '_method' in req.body){
    // look in urlencoded POST bodies and delete it
    var method = req.body._method;
    delete req.body._method;
    return method;
  }
}));

router.route('/')
   .get(function(req, res, next) {
      res.render('index', { title: 'KC Reminders' , weeble: "Hello World!!!"});
    })
   //POST new user to mongo
    .post(function(req, res) {
    //Get values from POST request
    var name = req.body.name;
    var email = req.body.email;
    var phone = req.body.phone;
    var zone = req.body.zone;
    var trashday = req.body.trashday;
    var notifEmail = req.body.notifEmail;
    var notifCalendar = req.body.notifCalendar;
    var notifText = req.body.notifText;
    //call create function on database
    var db = mongoose.connection;
    db.on('error', console.error.bind(console, 'connection error: '));
    db.once('open', function(){
      console.log('connected to mongodb!');
    });
    mongoose.model('user').create({
      name:name,
      email:email,
      phone:phone,
      zone:zone,
      trashday:trashday,
      notifEmail:notifEmail,
      notifCalendar:notifCalendar,
      notifText:notifText,
      created: new Date()
    }, function (err, user) {
      if(err){
        res.send("There was a problem adding this user to the database!")
      } else {
        //yay we made it!
        console.log('POST creating new user: ' + user);
        res.format({
          //HTML response setting location and redirecting back to homepage.
          html:function(){
            //if it worked, send the header to the address bar doesn't still have /adduser in it
            res.location('users');
            //Jump to success page!
            res.redirect('submission');
          },
          //JSON response showing the newly created user
          json: function(){
            res.json(user);
          }

        })
      }
    }
    );
  });

router.route('/submission')
  .get(function(req, res, next) {
    res.render('submission', { title: 'Thank you for your submission!'});
   });
   
module.exports = router;
