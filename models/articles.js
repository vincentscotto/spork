const mongoose = require('mongoose');

// Schema
const articleSchema = mongoose.Schema({
  title: {
    type: String
  },

  subtitle: {
    type: String
  },

  description: {
    type: String
  },

  category: {
    type: String
  },

  body: {
    type: String
  },

  author: {
    type: String
  },

  created: {
    type: Date,
    default: Date.now
  },

  comments: [{
    comment_subject: {
      type: String
    },

    comment_body: {
      type: String
    },

    comment_author: {
      type: String
    },

    comment_email: {
      type: String
    },
    
    comment_date: {
      type: String
    },
  }]


});

const Article = module.exports = mongoose.model('Article', articleSchema);

// Get articles
module.exports.getArticles = function(callback, limit) {
  Article.find(callback).limit(limit).sort([['title', 'ascending']]);
}

// Get Article by Category
module.exports.getCategoryArticles = function(categoryId, callback) {
  let query = { category: categoryId }
  Article.find(query, callback).sort([['title', 'ascending']]);
}

// Add article
module.exports.addArticle = function(category, callback) {
  Article.create(category, callback);
}

// Get single article by ID
module.exports.getArticleById = function(id, callback) {
  Article.findById(id, callback);
}

// Update article by ID
module.exports.updateArticle = function(query, update, options, callback) {
  Article.findOneAndUpdate(query, update, options, callback);
}

// Delete article by ID
module.exports.deleteArticle = function(query, callback) {
  Article.remove(query, callback);
}

// Comment on article
module.exports.addComment = function(query, comment, callback) {
  console.log(query);
  Article.update(query,{
    $push: {
      comments: comment
    }
  }, callback);
}
