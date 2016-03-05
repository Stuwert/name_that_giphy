var express = require('express');
var router = express.Router();


router.use(function(req, res, next){
  if(req.params.user_id === req.cookies.id){
    next()
  }
  else{
    res.send("NOT ALLOWED!");
  }
})




module.exports = router;
