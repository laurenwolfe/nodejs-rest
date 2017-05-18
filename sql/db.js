var promise = require('bluebird');

var pgp = require('pg-promise')({
    promiseLib: promise
});
var cn = process.env.DATABASE_URL || 'postgres://localhost:5432/spd_db';
var db = pgp(cn);

module.exports = db;