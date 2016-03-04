var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gif/:searchTerm', function(req, res, next) {

  console.log(req.params.searchTerm);

});

module.exports = router;
