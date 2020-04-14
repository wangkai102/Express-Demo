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

router.post('/', async function (req, res, next) {
  const { body } = req;

  await model.Article.create(body);
  res.json({ result: 0 });
});

router.get('/:id', async function (req, res) {
  const data = await model.Article.findByPk(req.params.id);
  console.log(data);
  res.json({ data });
});

router.put('/:id', async function (req, res) {
  const data = await model.Article.findByPk(req.params.id);
  data.update(req.body);
  res.json({ result: 0 });
});

router.delete('/:id', async function (req, res) {
  const data = await model.Article.findByPk(req.params.id);
  data.destroy();
  res.json({ result: 0 });
});
module.exports = router;
