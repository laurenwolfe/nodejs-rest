var http = require("http");
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = express.Router()
var index = require('./routes/index');

// view engine setup
app.set('views', 'views');
app.set('view engine', 'jade');

// uncomment after placing your favicon in /public
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(index);
app.use(express.static('public'));

router.use(function(req, res, next) {
    console.log('%s %s %s', req.method, req.url, req.path);
    next();
});

app.listen(process.env.PORT || 5000);

module.exports = {
    app: app,
    router: router,
    http: http
};
