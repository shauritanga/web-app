const express  = require('express'),
middleware      = require('../middlewares/index'),
Comment        = require('../models/comment'),
Post           = require('../models/post'),
router         = express.Router();


//get create form
router.get('/posts/:id/comments/new', function(req, res) {
    Post.findById(req.params.id, function(err, post) {
        if(err) {
            console.log('no such post')
        }else {
            res.render('comments/new', {
                post,
                title: 'add comment',
                path: '/posts/:id'
            });
        }
    });
});

//save comments
router.post('/posts/:id/comments', function(req, res) {
    if(req.session && req.session.userId) {
        Post.findById(req.params.id, function(err, post) {
        if(err) {
            res.redirect('/posts');
        }else {
            Comment.create({message: req.body.comment}, function(err, comment) {
                if(err) {
                    console.log(err);
                    res.redirect('/posts');
                } else {
                    comment.author.id = req.session.userId._id;
                    comment.author.username = req.session.userId.lastName;
                    comment.save();
                    post.comments.push(comment);
                    post.save();
                    res.redirect('/posts/' + post._id);
                }
            })
        }
    });
    } else {
        res.redirect('/users/login');
    }
    
});

//show comments
router.get('/posts/:id/comments', function(req,res) {
    res.send('COMMENTS');
});

//get edit form
router.get('/posts/:id/comments/:comment_id/edit', function(req, res) {
    res.send('edit form here')
});

//updata comment
router.put('/posts/:id/comments/:comment_id', function(req, res) {
    res.send('edit commet')
});

//destroy comment
router.delete('/posts/:id/comments/:comment_id', function(req, res) {
    Comment.findById(req.params.comment_id).exec((err, comment) => {
        if(err) return err;
        console.log(comment)
    })
    res.send('removed');
});



module.exports = router
