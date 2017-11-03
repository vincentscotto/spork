const mongoose = require('mongoose');

// Schema
const categorySchema = mongoose.Schema({
  title: {
    type: String
  },

  description: {
    type: String
  }

});

const Category = module.exports = mongoose.model('Category', categorySchema);

// Get categories
module.exports.getCategories = function(callback, limit) {
  Category.find(callback).limit(limit).sort([['title', 'ascending']]);
}

// Add category
module.exports.addCategory = function(category, callback) {
  Category.create(category, callback);
}

// Get single category by ID
module.exports.getCategoryById = function(id, callback) {
  Category.findById(id, callback);
}

// Update category by ID
module.exports.updateCategory = function(query, update, options, callback) {
  Category.findOneAndUpdate(query, update, options, callback);
}

// Delete category by ID
module.exports.deleteCategory = function(query, callback) {
  Category.remove(query, callback);
}

