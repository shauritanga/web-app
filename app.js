const express      = require('express'),
bodyParser         = require('body-parser'),
mongoose           = require('mongoose'),
userRoutes         = require('./routes/users'),
methodOverride     = require('method-override'),
postRoutes         = require('./routes/posts'),
commentRoutes      = require('./routes/comments'),
session            = require('express-session'),
app                = express(),
port               = process.env.PORT || 3000;

// CONFIG SESSION
app.use(session({
    secret: 'Shauritanga loves you all',
    resave: false,
    saveUninitialized: false
}));

// PASSPORT CONFIGURATION

//CONFIG APP
app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// CONNCTING TO DB
mongoose.connect('mongodb://localhost:27017/app', {useNewUrlParser: true, useCreateIndex: true});

//landing page
app.get('/', function(req, res) {
    res.render('index', {
        title: 'Home',
        path: '/'
    })
})
//CONFIG ROUES
app.use('/users', userRoutes);
app.use('/posts/:id/comments', commentRoutes);
app.use('/posts', postRoutes);



//LISTENING ON PORT
app.listen(port, function() {
    console.log(`Server is running on port ${port}`)
});