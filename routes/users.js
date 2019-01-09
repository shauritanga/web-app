const express = require('express'),
      bcrypt  = require('bcryptjs'),
      User    = require('../models/user');
      router  = express.Router();


router.get('/profile', function(req, res) {
    res.send('profile pages');
});

//GET register form
router.get('/new', function(req, res) {
    res.render('users/new', {
        title: 'Sign Up'
    })
});

//POST user
router.post('/', function(req, res, next) {
    if(req.body.firstName &&
        req.body.lastName &&
        req.body.email &&
        req.body.password &&
        req.body.confirm) {
        if(req.body.password !== req.body.confirm) {
            return new Error('Passwords do not match')
        }
        bcrypt.genSalt(10, function(err, salt) {
            if(err) return err;
            bcrypt.hash(req.body.password, salt, function(err, hash) {
                if(err) return err;
                req.body.password = hash;
                User.create({
                    firstName: req.body.firstName,
                    lastName: req.body.lastName,
                    email: req.body.email,
                    password: req.body.password
                }, function(err, user) {
                    if(err){
                        console.log(err);
                    } else {
                        req.session.userId = user;
                        res.redirect('/posts');
                    }
                 });
            });

        });
    } else {
            console.log('All fields are required');
     }
});

//GET login form
router.get('/login', function(req, res) {
    res.render('users/login', {
        title: 'login'
    });
});

//Authenticate
router.post('/login', function(req, res) {
    //find in the database
    User.findOne({email: req.body.email}, function(err, user) {
        if(!user) {
            console.log(err);
        } else {
            bcrypt.compare(req.body.password, user.password, function(err, result) {
                if(err ){
                    console.log(err);
                } else {
                    req.session.userId = user;
                    res.redirect('/posts')
                }
             });
        }
    });
});



module.exports = router;

