var promise = require('bluebird');

var options = {
    promiseLib: promise
}

var pgp = require('pg-promise')(options);

var connectionString = process.env.DATABASE_URL || 'postgres://localhost:5432/spd_db';
var db = pgp(connectionString);

// fetch params
// var pupID = parseInt(req.params.id);
/*
 function getSinglePuppy(req, res, next) {
 var pupID = parseInt(req.params.id);
 db.one('select * from pups where id = $1', pupID)
 .then(function (data) {
 res.status(200)
 .json({
 status: 'success',
 data: data,
 message: 'Retrieved ONE puppy'
 });
 })
 .catch(function (err) {
 return next(err);
 });
 }
 */

function listAllReports(req, res, next) {
    db.any('select * from spd_911_reports')
        .then(function (data) {
            res.status(200).json({
                    status: 'success',
                    data: data,
                    message: 'Returned all 911 Reports.'
            });
        })
        .catch(function (err) {
            return next(err);
    });
}


function filterReportsByMonth(req, res, next) {
    var startTimestamp = req.params['start_year'] + "-"
        + req.params['start_month'] + "-01 00:00:00";
    var endTimestamp = req.params['end_year'] + "-"
        + req.params['end_month'] + "-31 23:59:59";

    db.any('SELECT * FROM spd_911_reports WHERE event_date BETWEEN $1 AND $2', [startTimestamp, endTimestamp])
        .then(function (data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved date range or reports successfully.'
            });
        })
        .catch(function (err) {
            return next(err);
    });
}

function listReportsSinceMonth(req, res, next) {
    var startTimestamp = req.params['start_year'] + "-"
        + req.params['start_month'] + "-01 00:00:00";

    db.any('SELECT * FROM spd_911_reports WHERE event_date BETWEEN $1 AND NOW()', [startTimestamp])
        .then(function (data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved reports from present to the provided date in the past successfully.'
            });
        })
        .catch(function (err) {
            return next(err);
    });
}

function listReportsInCategory(req, res, next) {
    db.any('SELECT * FROM spd_911_reports as r JOIN incident_categories AS c ' +
        'ON c.event_type = r.event_type WHERE c.category_id = $1', [req.params['category']])
        .then(function (data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved a list of reports by category successfully!'
            });
        })
        .catch(function (err) {
            return next(err);
    });
}

function getReportsForNeighborhood(req, res, next) {
    db.any('SELECT * FROM spd_911_reports' +
        'WHERE neighborhood = $1', [req.params['neighborhood']])
        .then(function (data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved a list of reports by category successfully!'
            });
        })
        .catch(function (err) {
            return next(err);
    });
}

function countByCategoryNeighborhoodAndMonth() {
    db.any('WHILE y_month <= EXTRACT(CURDATE()) LOOP ' +
        'SELECT ADD_DATE((SELECT MIN(call_time) FROM spd_911_reports), ' +
        'INTERVAL 1 MONTH) AS y_month, neighborhood, event_type, ' +
        'COUNT(DISTINCT event_id) as num_events ' +
        'FROM spd_911_reports GROUP BY neighborhood, event_type ' +
        'END LOOP; ')
        .then(function (data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Retrieved a list of reports by category successfully!'
            });
        })
        .catch(function (err) {
            return next(err);
    });
}

module.exports = {
    listAllReports: listAllReports,
    filterReportsByMonth: filterReportsByMonth,
    listReportsSinceMonth: listReportsSinceMonth,
    listReportsInCategory: listReportsInCategory,
    getReportsForNeighborhood: getReportsForNeighborhood,
    countByCategoryNeighborhoodAndMonth: countByCategoryNeighborhoodAndMonth
};