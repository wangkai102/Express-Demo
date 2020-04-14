var express = require('express');
var router = express.Router();
const model = require('../models');

/* GET home page. */
router.get('/', async function (req, res, next) {
  const data = await model.Article.findAll({
    order: [['id', 'DESC']],
  });
  res.json({ data });
});

module.exports = router;
