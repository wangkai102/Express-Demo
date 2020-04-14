var express = require('express');
var router = express.Router();
const models = require('../models');
const Op = models.Sequelize.Op;

/* GET home page. */
router.get('/', async function (req, res, next) {
  /* 模糊查询 */

  const where = {};
  const { title } = req.query;
  if (title) {
    where.title = {
      [Op.like]: `%${title}%`,
    };
  }
  /* 分页查询 */
  const currentPage = parseInt(req.query.currentPage) || 1;
  const pageSize = parseInt(req.query.pageSize) || 1;

  const result = await models.Article.findAndCountAll({
    order: [['id', 'DESC']],
    where,
    offset: (currentPage - 1) * pageSize,
    limit: pageSize,
  });
  res.json({ data: result.rows, total: result.count, currentPage, pageSize });
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
