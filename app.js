const express      = require('express'),
bodyParser         = require('body-parser'),
mongoose           = require('mongoose'),
passport           = require('passport'),
LocalStrategy      = require('passport-local'),
User               = require('./models/user'),
routes             = require('./routes/routes'),
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
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

//CONFIG APP
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// CONNECTING TO DB
mongoose.connect('mongodb://ashauritanga:athanas2015@ds027348.mlab.com:27348/app', {useNewUrlParser: true, useCreateIndex: true})
        .then(() => console.log('Connected'))
        .catch(err => console.log(err));


//CONFIG ROUES
app.use('/', routes);



//LISTENING ON PORT
app.listen(port, function() {
    console.log(`Server is running on port ${port}`)
});