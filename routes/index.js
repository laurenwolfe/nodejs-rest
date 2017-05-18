var express = require('express');
var app = express();
var router = express.Router();

var query = require("../sql/index");

app.get("/", function (req, res) {
    console.log("app.get!");
});

router.get('/', function(req, res) {
    console.log('router.get!');
    res.render('index', {
        title: 'Seattle Boom, CSE 442'
    });
});

// Get all 911 response records
// https://sbnodeserver.herokuapp.com/api/spd/limit/10/offset/10
// http://localhost:5000/api/spd/limit/10/offset/10
router.get('/api/spd/records/limit/:limit/offset/:offset', query.listAllReports);

// Get 911 response records by month range
// http://localhost:5000/api/spd/records/from/2010/10/to/2010/11/limit/10/offset/10
router.get('/api/spd/records/from/:syear/:smonth/to/:eyear/:emonth/limit/:limit/offset/:offset', query.filterReportsByMonth);

// Get 911 response records from month to present
// http://localhost:5000/api/spd/records/from/2010/10/limit/10/offset/10
router.get("/api/spd/records/from/:syear/:smonth/limit/:limit/offset/:offset", query.listReportsSinceMonth);

// Get reports by major category
// http://localhost:5000/api/spd/records/category/1/limit/10/offset/10
router.get('/api/spd/records/category/:category/limit/:limit/offset/:offset', query.listReportsInCategory);

// Get reports by neighborhood
// http://localhost:5000/api/spd/records/neighborhood/Ballard/limit/10/offset/10
router.get('/api/spd/records/neighborhood/:hood/limit/:limit/offset/:offset', query.getReportsForNeighborhood);

// Get
// http://localhost:5000/api/spd-zillow/monthly-figures/limit/10/offset/10
router.get('/api/spd-zillow/monthly-figures/limit/:limit/offset/:offset', query.countByCategoryNeighborhoodAndMonth);

module.exports = router;