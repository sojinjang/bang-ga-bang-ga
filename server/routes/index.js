var express = require('express');
var router = express.Router();
var sql = require('../database/sql');



/* GET home page. */

router.get('/', async function(req, res, next) {

  const sections = await sql.getSections();

  res.status(200).json({message: '연결성공'});

  console.log(sections);

});

module.exports = router;
