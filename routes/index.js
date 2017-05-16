var express = require('express');
var app = express();
var router = express.Router();

var db = require("../queries");

app.get("/", function (req, res) {
    console.log("app.get!");
});

router.get('/', function(req, res) {
    console.log('router.get!');
    res.render('index', {
        title: 'Seattle Boom, CSE 442'
    });
});

// GTG: https://sbnodeserver.herokuapp.com/reports/limit/10/offset/10
router.get('/reports/limit/:limit/offset/:offset', db.listAllReports);
// TODO: https://sbnodeserver.herokuapp.com/reports/start/01/2017/end/05/2017/limit/10/offset/10
router.get('/reports/start/:start_month/:start_year/end/:end_month/:end_year/limit/:limit/offset/:offset', db.filterReportsByMonth);
// TODO: https://sbnodeserver.herokuapp.com/reports/start/01/2017/limit/10/offset/10
router.get("/reports/start/:start_month/:start_year/limit/:limit/offset/:offset", db.listReportsSinceMonth);
// GTG: https://sbnodeserver.herokuapp.com/reports/categories/5/limit/10/offset/10
router.get('/reports/categories/:category/limit/:limit/offset/:offset', db.listReportsInCategory);
// 
router.get('/reports/neighborhoods/:neighborhood/limit/:limit/offset/:offset', db.getReportsForNeighborhood);

//router.get('/reports/countByCategoryNeighborhoodAndMonth/limit/:limit/offset/:offset', db.countByCategoryNeighborhoodAndMonth);

module.exports = router;