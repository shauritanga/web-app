const express      = require('express'),
bodyParser         = require('body-parser'),
mongoose           = require('mongoose'),
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

//CONFIG APP
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(__dirname + '/public'));
app.set('view engine', 'ejs');

// CONNCTING TO DB
mongoose.connect('mongodb://localhost:27017/app');


//CONFIG ROUES
app.use('/', routes);



//LISTENING ON PORT
app.listen(port, function() {
    console.log(`Server is running on port ${port}`)
});