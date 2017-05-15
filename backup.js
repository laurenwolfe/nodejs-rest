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
            })
        }).then() {

    }).catch( err => console.log(err))
}

function filterReportsByMonth(req, res, next) {
    var param_vals = req.params;

    param_vals.start_month
    db.any('select *')
}

function listReportsSinceMonth(req, res, next) {

}

function listReportsInCategory(req, res, next) {

}

function getReportsForNeighborhood(req, res, next) {

}

function countByCategoryNeighborhoodAndMonth() {

}

module.exports = {
    listAllReports: listAllReports,
    filterReportsByMonth: filterReportsByMonth,
    listReportsSinceMonth: listReportsSinceMonth,
    listReportsInCategory: listReportsInCategory,
    getReportsForNeighborhood: getReportsForNeighborhood,
    countByCategoryNeighborhoodAndMonth: countByCategoryNeighborhoodAndMonth
};