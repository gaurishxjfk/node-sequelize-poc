const products = require('../controller/prodcut.js')

module.exports = function(app) {

    app.get('/total_visitors_today', products.getTotalVisitorsToday);

}