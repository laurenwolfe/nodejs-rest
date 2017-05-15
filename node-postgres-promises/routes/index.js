var express = require('express');
var router = express.Router();
var pg = require('pg').native
    , connectionString process.env.DATABASE_URL || 'postgres://localhost:5432/spd_db'
    , client
    , query;

pg.defaults.ssl = true;

client = new pg.Client(connectionString);

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/db', function (request, response, next) {
    client.connect();

    client.query('SELECT * FROM test_table', function(err, result) {
        done();
        if (err) {
            console.error(err); response.send("Error " + err);
        } else {
            response.render('pages/db', {results: result.rows});
        }
    });
});

module.exports = router;
