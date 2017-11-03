const express = require('express'),
      router = express.Router({ mergeParams: true });

Category = require('../models/Category.js');
Articles = require('../models/Articles.js');

router.get('/manage', (req, res, next) => {
  // res.send('Manage, son');
  res.render('manage', {
    title: "This will be the main manage page"
  })
});

router.get('/manage/articles/', (req, res, next) => {
  Articles.getArticles((err, articles) => {
    if (err) {
      res.send(err);
    }
    res.render('manage_articles', {
      title: 'Manage Articles',
      articles: articles
    });
  });
});

router.get('/manage/categories/', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err);
    }
    res.render('manage_categories', {
      title: 'Categories',
      categories: categories
    })
  });
});

router.get('/manage/add/article/', (req, res, next) => {
  Category.getCategories((err, categories) => {
    if (err) {
      res.send(err);
    }
    res.render('add_article', {
      title: 'Create Article',
      categories: categories
    });
  })
});

router.get('/manage/edit/article/:id', (req, res, next) => {
  Articles.getArticleById(req.params.id, (err, article) => {
    if (err) {
      res.send(err)
    }
    Category.getCategories((err, categories) => {
      res.render('edit_article', {
        title: 'Edit Article',
        article: article,
        categories: categories
      });
    });
  });
});

router.get('/manage/add/category', (req, res, next) => {
  res.render('add_category', {
    title: 'Create Category'
  });
});

router.get('/manage/edit/category/:id', (req, res, next) => {
  Category.getCategoryById(req.params.id, (err, category) => {
    if (err) {
      res.send(err)
    }
    res.render('edit_category', {
      title: 'Edit Category',
      category: category
    });
  });
});


// delete article
router.get('/delete/article/:id', (req, res, next) => {
  const query = { _id: req.params.id }

  Articles.deleteArticle(query, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.status(200)
  });
});



module.exports = router;