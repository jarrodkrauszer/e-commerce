const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint
// gets all tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({ include: Product });

    res.json(tags);

  } catch (err) {
    res.status(400).json(err);
  }
});

// gets one tag by id
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  const id = req.params.id;
  
  try {
    const tag = await Tag.findByPk(id, { include: Product })

    if (!tag) {
      return res.status(404).json({ message: 'Tag not found' });
    }
    
    res.json(tag);

  } catch (err) {
    res.status(400).json(err);
  } 
});

// creates a new tag
router.post('/', async (req, res) => {
  // create a new tag
  const data = req.body;

  if (!data.tag_name) {
    return res.status(400).json({
      message: 'Tag name can not be empty!!'
    });
  }

  try {
    const tag = await Tag.create(data);

    res.status(200).json(tag);
    
  } catch (err) {
    res.status(400).json(err);
  }
});

// updates a tag by id
router.put('/:id', async (req, res) => {
  // update a tag's name by its `id` value
  const id = req.params.id;
  const data = req.body;

  if (!data.tag_name) {
    return res.status(400).json({
      message: 'Tag name can not be empty!!'
    });
  }

  try {
    await Tag.update(data, {
      where: {
        id: id
      }
    });

    res.json({ message: 'Tag Updated Successfully!'});

  } catch (err) {
    res.status(400).json(err);
  }
});

// deletes tag by id
router.delete('/:id', async (req, res) => {
  // delete on tag by its `id` value
  const id = req.params.id;

  try {
    await Tag.destroy({
      where: {
        id: id
      }
    });
  
    res.json({ message: 'Tag deleted successfully!' });
  } catch (err) {
    res.status(400).json(err);
  }
});

module.exports = router;