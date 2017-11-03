const express = require('express'),
      router = express.Router({ mergeParams: true });

const Article = require('../models/Articles.js');

router.get('/articles', (req, res, next) => {
  Article.getArticles((err, articles) => {
    res.render('articles', {
      title: "Articles",
      articles: articles
    })
  })
});

router.get('/articles/show/:id', (req, res, next) => {
  Article.getArticleById(req.params.id, (err, articles) =>{
    res.render('article', {
      title: "Article",
      articles: articles
    });
  });
});


router.get('/article/category/:categoryid', (req, res, next) => {

  Article.getCategoryArticles(req.params.categoryid, (err, articles) => {
    Category.getCategoryById(req.params.categoryid, (err, category) => {
      res.render('articles', {
        title: category.title + " Articles",
        articles: articles
      });
    });
  });
});


// add article
router.post('/add/article', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render('add_article', {
      errors: errors,
      title: 'Create Article'
    });
  } else {
    let article = new Article();

    article.title = req.body.title;
    article.subtitle = req.body.subtitle;
    article.author = req.body.author;
    article.category = req.body.category;
    article.body = req.body.body;
    // article.created = req.body.date;

    Article.addArticle(article, (err, article) => {
      if (err) {
        res.send(err);
      }

      res.redirect('/manage/articles')
    });
  }
});


// edit article
router.post('/edit/article/:id', (req, res, next) => {
  req.checkBody('title', 'Title is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    res.render('edit_article', {
      errors: errors,
      title: 'Edit Article'
    });
  } else {
    let article = new Article();
    const query = { _id: req.params.id }
    const update = {
      title: req.body.title,
      subtitle: req.body.subtitle,
      author: req.body.author,
      category: req.body.category,
      body: req.body.body
    }

    Article.updateArticle(query, update, {}, (err, article) => {
      if (err) {
        res.send(err);
      }
      res.redirect('/manage/articles')
    });
  }
});

// delete article
router.delete('/:id', (req, res, next) => {
  const query = { _id: req.params.id }

  Article.deleteArticle(query, (err, article) => {
    if (err) {
      res.send(err);
    }
    res.status(200)
  });
});

router.post('/article/comments/add/:id', (req, res, next) => {
  req.checkBody('comment_subject', 'Subject is required').notEmpty();
  req.checkBody('comment_author', 'Author is required').notEmpty();
  req.checkBody('comment_email', 'Email is required').notEmpty();
  req.checkBody('comment_body', 'Body is required').notEmpty();

  let errors = req.validationErrors();

  if (errors) {
    Article.getArticleById(req.params.id, (err, articles) =>{
      res.render('article', {
        title: "Article",
        articles: articles,
        errors: errors
      });
    });
  } else {
    let article = new Article();
    let query = { _id: req.params.id }

    let comment = {
      comment_subject: req.body.comment_subject,
      comment_author: req.body.comment_author,
      comment_email: req.body.comment_email,
      comment_body: req.body.comment_body,
    }

    Article.addComment(query, comment, (err, article) => {
      res.redirect('/articles/show/' + req.params.id);
    });
  }

});


module.exports = router;