var express = require('express');
var router = express.Router();
var connection = require('../sql/connect')
/* GET home page. */
router.get('/', function(req, res, next) {
  console.log(req)
  connection.query('select * from users', function(error,results){
    console.log(results)
    res.send({
      code:0,
      data:results  
    })
  })
});

module.exports = router;
