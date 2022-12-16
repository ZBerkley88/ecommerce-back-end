const router = require('express').Router();
const { Category, Product } = require('../../models');

// The `/api/categories` endpoint

// get all categories
router.get('/', async (req, res) => {
  // find all categories
  try {
    const catData = await Category.findAll({
      // be sure to include its associated Products
      include: [{ model: Product }],
    });
    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one category
router.get('/:id', async (req, res) => {
  // find one category by its `id` value
  try {
    const catData = await Category.findByPk(req.params.id, {
      // be sure to include its associated Products
      include: [{ model: Product}]
    });

    if (!catData) {
      res.status(404).json({ message: 'No category found with this ID!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new category
router.post('/', async (req, res) => {
  try {
    const catData = await Category.create(req.body);
    res.status(200).json(catData);
  } catch (err) {
    res.status(400).json(err);
  }
});


router.put('/:id', (req, res) => {
  Category.update(req.body, {
    where: { id: req.params.id }
  }).then(result => {
    res.json(result)
  })
})

// router.put('/:id', async (req, res) => {
//   // update a category by its `id` value
//   try { 
//     const catData = await Category.update(req.body, {
//       where: {
//         id: req.params.id,
//       },
//     })
//   } catch (err) {
//     res.status(400).json(err);
//   }
// });

router.delete('/:id', async (req, res) => {
  // delete a category by its `id` value
  try {
    const catData = await Category.destroy({
      where: {
        id: req.params.id,
      },
    });

    if (!catData) {
      res.status(404).json({ message: 'No category found with that ID!' });
      return;
    }

    res.status(200).json(catData);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
