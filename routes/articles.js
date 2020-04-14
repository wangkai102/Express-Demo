var express = require('express');
var router = express.Router();
const models = require('../models');
const Op = models.Sequelize.Op;

/* GET home page. */
router.get('/', async function (req, res, next) {
  const where = {};
  const { title } = req.query;
  if (title) {
    where.title = {
      [Op.like]: `%${title}%`,
    };
  }
  const data = await models.Article.findAll({
    order: [['id', 'DESC']],
    where,
  });
  res.json({ data });
});

router.post('/', async function (req, res, next) {
  const { body } = req;

  await models.Article.create(body);
  res.json({ result: 0 });
});

router.get('/:id', async function (req, res) {
  const data = await models.Article.findByPk(req.params.id);
  console.log(data);
  res.json({ data });
});

router.put('/:id', async function (req, res) {
  const data = await models.Article.findByPk(req.params.id);
  data.update(req.body);
  res.json({ result: 0 });
});

router.delete('/:id', async function (req, res) {
  const data = await models.Article.findByPk(req.params.id);
  data.destroy();
  res.json({ result: 0 });
});
module.exports = router;
