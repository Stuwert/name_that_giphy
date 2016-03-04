var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/gif/:searchTerm', function(req, res, next) {
  res.json('Hey We Got Json!');
  console.log(req.params.searchTerm);

});

module.exports = router;

// api key  dc6zaTOxFJmzC
