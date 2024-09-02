const router = require('express').Router();
const { Sequelize, ValidationError } = require('sequelize');
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

router.get('/', async (req, res) => {
  //Find all categories
  const categories = await Category.findAll({
    include: [{ model: Product }]
  });
  res.json(categories);
});

// GET a specific category by ID
router.get('/:id', async (req, res) => {
  const category = await Category.findByPk(req.params.id, {
    include: [{ model: Product }]
  });
  if (category) {
    res.json(category);
  }
});

// CREATE a new category
router.post('/', async (req, res) => {
  const formData = req.body;
  await Category.create(formData)

  res.json({
    message: 'Category created successfully'
  })
});

// UPDATE a category by ID
router.put('/:id', async (req, res) => {
  const category = await Category.update(req.body, {
    where: { id: req.params.id },
    returning: true
  });
  res.json({
    message: 'Category has been updated!',
    category
  });
});

// DELETE a category by ID
router.delete('/:id', async (req, res) => {
  await Category.destroy({
    where: { id: req.params.id }
  });
  res.json({ message: 'Category has been deleted successfully' });
});

module.exports = router;