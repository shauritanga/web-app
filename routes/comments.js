const express  = require('express'),
router         = express.Router();

router.get('/new', function(req, res) {
    res.send('NEW COMMENT ROUTE');
});

router.get('/posts/:id/comments', function(req,res) {
    res.send('COMMENTS');
});


module.exports = router;


