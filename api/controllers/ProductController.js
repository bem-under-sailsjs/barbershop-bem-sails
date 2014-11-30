/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `ProductController.index()`
   */
  index: function (req, res) {
    Product.find(function(err, products) {
      res.view('product/index', {products: products});
    });
  },

  /**
   * `ProductController.show()`
   */
  show: function(req, res) {
    Product.findOne({id: req.param('id')}, function(err, product) {
      res.view('product/show', {product: product});
    });

  },

  /**
   * `ProductController.create()`
   */
  create: function (req, res) {

    Product.create(req.params.all(), function(err, product) {
      if (err) return next(err);

      res.status(201);
      res.redirect('/product/' + product.id);
    });

  },


  /**
   * `ProductController.edit()`
   */
  edit: function (req, res) {
    Product.findOne({id: req.param('id')}, function(err, product) {
      res.view('product/edit', {product: product});
    });
  },


  /**
   * `ProductController.new()`
   */
  'new': function (req, res) {
    res.view('product/new');
  },


  /**
   * `ProductController.update()`
   */
  update: function (req, res) {

    Product.update(req.param('id'), req.params.all(), function(err, product) {
      if (err) res.redirect('/product/' + req.param('id') + '/edit');

      res.status(201);
      res.redirect('/product/' + req.param('id'));
    });
  },


  /**
   * `ProductController.delete()`
   */
  'delete': function (req, res) {
    var productId = req.param('id');

    Product.findOne({id: productId}, function(err, product) {

      Product.delete({id: productId}, function(err) {
        next();
      });

    });
  }
};

