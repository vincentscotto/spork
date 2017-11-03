const express = require('express'),
      router = express.Router({ mergeParams: true });

Category = require('../models/Category.js');

// get all categories
router.get('/categories', (req, res, next) => {
  // res.send('Categories, son');
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err);
    }

    res.render('categories', {
      title: 'Categories',
      categories: categories
    })
  });
});

// add category
router.post('/add/category', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render('add_category', {
      errors: errors,
      title: 'Create Category'
    });
  } else {
    let category = new Category();
    category.title = req.body.title;
    category.description = req.body.description;

    Category.addCategory(category, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.redirect('/manage/categories');
    });
  }
});

// edit category
router.post('/edit/category/:id', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render('edit_category', {
      errors: errors,
      title: 'Edit Category'
    });
  } else {
    let category = new Category();
    const query = { _id: req.params.id }

    const update = {
      title: req.body.title,
      description: req.body.description
    }

    Category.updateCategory(query, update, {}, (err, category) => {
      if (err) {
        res.send(err);
      }
      res.redirect('/manage/categories');
    });
  }
});

// delete category
// having router.delete did not work, couldn't figure out why :(
// this deletes it, but it basically just gives:  "Waiting for localhost" and never refreshes back
// to the page like it should.  you have to manually refresh to see that deletion change.
// TODO:  fix it.

router.get('/delete/category/:id', (req, res, next) => {
  const query = { _id: req.params.id }
  console.log(req)

  Category.deleteCategory(query, (err, category) => {
    if (err) {
      res.send(err);
    }
    res.status(200);
  });
});

router.get('/category/:category_id', (req, res, next) => {
  res.send('Category here');
});

module.exports = router;