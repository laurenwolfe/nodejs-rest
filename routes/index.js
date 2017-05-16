var express = require('express');
var app = express()
var router = express.Router();

var db = require("../queries");

app.get("/", function (req, res) {
    console.log("app.get!");
});

router.get('/', function(req, res) {
    console.log('router.get!');
    res.render('index', {
        title: 'Express'
    });
});

router.get('/reports', db.listAllReports);
router.get('/reports/start/:start_month/:start_year/end/:end_month/:end_year', db.filterReportsByMonth);
router.get("/reports/start/:start_month/:start_year", db.listReportsSinceMonth);
router.get('/reports/categories/:category', db.listReportsInCategory);
router.get('/reports/neighborhoods/:neighborhood', db.getReportsForNeighborhood);
router.get('/reports/countByCategoryNeighborhoodAndMonth/', db.countByCategoryNeighborhoodAndMonth);

module.exports = router;