const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint
// Get all categories
router.get('/', async (req, res) => {
  // find all categories
  // be sure to include its associated Products
  try {
    const categories = await Category.findAll({
      include: Product
    });

    res.json(categories);

  } catch (err) {
    res.status(503).json(err);
  }
});

// Find one category by id
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  // be sure to include its associated Products
  const id = req.params.id;

  try {
    const category = await Category.findByPk(id, {
      include: Product
    });

    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    
    res.json(category);

  } catch (err) {
    res.status(503).json(err);
  }
});

// Create new category
router.post('/', async (req, res) => {
  // create a new category
  const data = req.body;

  if (!data.category_name) {
    return res.status(400).json({
      message: 'Category name can not be empty!!'
    });
  }

  try {
    const category = await Category.create(data);

    res.status(200).json(category);

  } catch (err) {
    res.status(503).json(err);
  }
});

// Update category by id
router.put('/:id', async (req, res) => {
  // update a category by its `id` value
  const id = req.params.id;
  const data = req.body;
  console.log('ID: ' + id);
  if (!data.category_name) {
    return res.status(400).json({
      message: 'Category name can not be empty!!'
    });
  }

  try {
    await Category.update(data, {
      where: {
        id: id
      }
    });

    res.json({ message: 'Category Updated Successfully!'});

  } catch (err) {
    res.status(503).json(err);
  }
});

// Delete category by id
router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  const id = req.params.id;

  try {
    await Category.destroy({
      where: {
        id: id
      }
    });
  
    res.json({ message: 'Category deleted successfully!' });
  } catch (err) {
    res.status(503).json(err);
  }
});

module.exports = router;
