var QueryFile = require('pg-promise').QueryFile;
var path = require('path');

// Link to .sql files
function sql(file) {
    var fullPath = path.join(__dirname, file);
    return new QueryFile(fullPath, {minify: true});
}

module.exports = {
    aggre: {
      counts_prices_hood_month: sql('aggre/counts_prices_hood_month.sql'),
    },
    spd: {
        all_reports: sql('spd/all_reports.sql'),
        by_category: sql('spd/by_category.sql'),
        by_month: sql('spd/by_month.sql'),
        by_nhood: sql('spd/by_nhood.sql'),
    }
};