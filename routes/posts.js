const express      = require('express'),
      User         = require('../models/user'),
      Post         = require('../models/post'),
      router       = express.Router();


router.get('/', function(req, res, next) {
    res.redirect('/posts')
});

router.get('/posts', function(req, res, next) {
    Post.find({}).exec(function(err, posts) {
        if(err) {
            const error = new Error('No any post yet!');
            return next(error);
        }
        res.render('index', {
            title: 'Home',
            posts
        });
    });
});

router.get('/posts/new', function(req, res, next) {
    res.render('new',{ title: 'Create post'})
});

router.post('/posts'); 

router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Sign Up'
    })
});

router.post('/register', function(req, res, next) {
    if(req.body.firstName &&
        req.body.lastName &&
        req.body.email &&
        req.body.password &&
        req.body.confirm) {
        if(req.body.password !== req.body.confirm) {
            return new Error('Passwords do not match')
        }
        User.create({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        }, function(err, user) {
            if(err){
                console.log(err);
            } else {
                req.sessionID = user._id;
                res.redirect('/posts');
            }
            console.log(req.sessionID);
        });
        } else {
            console.log('All fields are required');
        }
})


module.exports = router;