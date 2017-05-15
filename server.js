var express = require('express');
var bodyParser = require('body-parser');
var index = require('./routes/index');

var app = express();

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static('public'));

app.listen(5000, function () {
    console.log('Running!!')
});

module.exports = app;

