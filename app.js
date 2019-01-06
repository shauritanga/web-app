const express      = require('express'),
bodyParser         = require('body-parser'),
mongoose           = require('mongoose'),
session            = require('express-session'),
app                = express(),
port               = process.env.PORT || 3000;











app.listen(port, function() {
    console.log(`Server is running on port ${port}`)
});





