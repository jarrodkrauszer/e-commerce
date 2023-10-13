// import models
const Product = require('./Product');
const Category = require('./Category');
const Tag = require('./Tag');
const ProductTag = require('./ProductTag');

// Products belongsTo Category
Product.belongsTo(Category, {
  foreignKey: 'category_id'
});
// Product.belongsTo(Category);

// Categories have many Products
Category.hasMany(Product, {
    foreignKey: 'category_id',
    onDelete: 'SET NULL'
  });
// Category.hasMany(Product);

// Products belongToMany Tags (through ProductTag)
Product.belongToMany(Tag, { through: 'product_tag', foreignKey: 'tag_id' });
// Tags belongToMany Products (through ProductTag)
Tag.belongToMany(Product, { through: 'product_tag', foreignKey: 'product_id'});


module.exports = {
Product,
  Category,
  Tag,
  ProductTag,
};