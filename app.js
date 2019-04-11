const express      = require('express'),
bodyParser         = require('body-parser'),
mongoose           = require('mongoose'),
userRoutes         = require('./routes/users'),
methodOverride     = require('method-override'),
postRoutes         = require('./routes/posts'),
commentRoutes      = require('./routes/comments'),
path               = require('path'),
session            = require('express-session'),
app                = express(),
port               = process.env.PORT || 3000,
url                = process.env.DATABASEURL || 'mongodb://localhost:27017/learn_forever';

// CONFIG SESSION
app.use(session({
    secret: 'Shauritanga loves you all',
    resave: false,
    saveUninitialized: false
}));

// make user available to all template
app.use((req, res, next) => {
    res.locals.currentUser = req.session.userId;
    next();
})

//CONFIG APP
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, 'public')));
app.set('view engine', 'ejs');

// CONNCTING TO DB
mongoose.connect(url, {useNewUrlParser: true, useCreateIndex: true});

//landing page
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home',
        path: '/'
    })
})
//CONFIG ROUES
app.use('/users', userRoutes);
app.use(commentRoutes);
app.use('/posts', postRoutes);


//LISTENING ON PORT
app.listen(port, function() {
    console.log(`Server is running on port ${port}`)
});
