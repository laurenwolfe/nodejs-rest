var db = require('./db');
var sql = require('./sql');
var PQ = require('pg-promise').ParameterizedQuery;
var fs = require("fs");

function listAllReports(req, res, next) {
    var numRecords = getLimitOffset(req.params['limit'], req.params['offset']);
    var allReports = new PQ(sql.spd.all_reports, [numRecords[0], numRecords[1]]);

    db.any(allReports)
        .then(function (data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Returned requested reports successfully.'
            });
        })
        .catch(function (err) {
            return next(err);
        });
}


function filterReportsByMonth(req, res, next) {
    var numRecords = getLimitOffset(req.params['limit'], req.params['offset']);
    var monthRange = getMonthRange(
        req.params['syear'], req.params['smonth'],
        req.params['eyear'], req.params['emonth']);

    var reportsByMonth = new PQ(sql.spd.by_month, [monthRange[0], monthRange[1],
        numRecords[0], numRecords[1]]);
    db.any(reportsByMonth)
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
    var numRecords = getLimitOffset(req.params['limit'], req.params['offset']);
    var monthRange = getMonthRange(
        req.params['syear'], req.params['smonth'],
        req.params['eyear'], req.params['emonth']);

    var reportsSinceMonth = new PQ(sql.spd.by_month, [monthRange[0], monthRange[1],
        numRecords[0], numRecords[1]]);

    db.any(reportsSinceMonth)
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
    var numRecords = getLimitOffset(req.params['limit'], req.params['offset']);
    var reportsByCategory = new PQ(sql.spd.by_category, [req.params['category'],
        numRecords[0], numRecords[1]]);

    db.any(reportsByCategory)
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
    var numRecords = getLimitOffset(req.params['limit'], req.params['offset']);
    var reportsByHood = new PQ(sql.spd.by_nhood,
        [req.params['hood'], numRecords[0], numRecords[1]]);

    db.any(reportsByHood)
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

function countByCategoryNeighborhoodAndMonth(req, res, next) {
    var numRecords = getLimitOffset(req.params['limit'], req.params['offset']);
    var monthRange = getMonthRange('', '');
    var categoryHoodMonth  = new PQ(sql.aggre.counts_prices_hood_month,
        [monthRange[0], monthRange[1], numRecords[0], numRecords[1]]);

    db.any(categoryHoodMonth)
        .then(function (data) {
            res.status(200).json({
                status: 'success',
                data: data,
                message: 'Count of incidents along with neighborhoods, months and average housing prices.'
            });
        })
        .catch(function (err) {
            return next(err);
        });
}

function getLimitOffset(limit, offset) {
    if(!limit) limit = 1000;
    if(!offset) offset  = 0;

    return [limit, offset];
}

function getMonthRange(syear, smonth, eyear, emonth) {
    if(!syear) syear = '1111';
    if(!smonth) smonth = '01';
    if(!eyear) eyear = '9999';
    if(!emonth) emonth = '12';

    var start_month = syear + '-' + smonth;
    var end_month =  eyear + '-' + emonth;

    return [start_month, end_month];
}

module.exports = {
    listAllReports: listAllReports,
    filterReportsByMonth: filterReportsByMonth,
    listReportsSinceMonth: listReportsSinceMonth,
    listReportsInCategory: listReportsInCategory,
    getReportsForNeighborhood: getReportsForNeighborhood,
    countByCategoryNeighborhoodAndMonth: countByCategoryNeighborhoodAndMonth
};

