var express = require('express');
var router = express.Router();
var pg = require('pg');

pg.defaults.ssl = true;
app.get('/db', function(request, response) {
  pg.connect(process.env.DATABASE_URL, function(err, client, done) {
  if (err) throw err;
  console.log('Connected to postgres! Getting schemas...');

  client.query('SELECT table_schema,table_name FROM information_schema.tables;')
    .on('row', function(row) { console.log(JSON.stringify(row)); });
});

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});

module.exports = router;
