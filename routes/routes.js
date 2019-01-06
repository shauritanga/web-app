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
        })
    });
});

router.post('/posts', function(req, res,next) {
    Post.create({

    }).exec(function(err, post) {
        if(err) return err
    });
    User.findById(req.user._id).exec(function(err, user) {
        if(err) return err;
        user.posts.push(post);
    });
});


router.get('/register', function(req, res, next) {
    res.render('register', {
        title: 'Sign Up'
    })
});


module.exports = router;