const express = require('express'),
      router = express.Router();

router.get('/', (req, res, next) => {
  Articles.getArticles((err, articles) => {
    res.render('index', {
      title: "Spork Blog",
      articles: articles
    });
  }, 5);
});

module.exports = router;