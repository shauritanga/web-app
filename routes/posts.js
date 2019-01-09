const express      = require('express'),
      User         = require('../models/user'),
      Post         = require('../models/post'),
      router       = express.Router();


router.get('/', function(req, res, next) {
    Post.find({}).exec(function(err, posts) {
        if(err) {
            const error = new Error('No any post yet!');
            return next(error);
        }
        res.render('posts/index', {
            title: 'Posts',
            posts,
            path: '/posts'
        });
    });
});

router.get('/new', function(req, res, next) {
    if(req.session && req.session.userId) {
        res.render('posts/new',{ title: 'Create post'})
    } else {
        res.send('you must login to do this');
    }
});
//EDIT ROUTE
router.get('/:id/edit', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if(err) {
            return res.redirect('/posts/'+ req.params.id);
        }
        res.render('posts/edit', {
            title: 'Edit post',
            post
        });
    });  
});

//UPDATE
router.put('/:id', function(req, res, next) {
    Post.findByIdAndUpdate(req.params.id, req.body.post, function(err, post) {
        if(err) {
            return res.redirect('/posts/' + req.params.id);
        }
        res.redirect('/posts');
    });
});

//DESTROY
router.delete('/:id', function(req, res, next) {
    Post.findByIdAndRemove(req.params.id, function(err) {
        if(err) {
            return res.redirect('/posts');
        }
        res.redirect('/posts');
    });
});



//SHOW ROUTE
router.get('/:id', function(req, res, next) {
    Post.findById(req.params.id, function(err, post) {
        if(err) {
            return res.redirect('/posts')
        }
        res.render('posts/show', {
            title: post.title,
            post
        })
    }); 
});

//CREATE post
router.post('/', function(req, res, next) {
    Post.create(req.body.post, function(err, post) {
        if(err) {
            return res.redirect('/posts/new');
        }
        post.author.id = req.session.userId._id,
        post.author.username = req.session.userId.lastName,
        post.save();
        res.redirect('/posts');
    });
});


module.exports = router;