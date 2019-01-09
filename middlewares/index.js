function isLoggedIn(req, res, next) {
    if(req.session && req.session.userId) {
        return res.redirect('/posts');
    }
    return next();
}

module.exports.isLoggrdIn = isLoggedIn;