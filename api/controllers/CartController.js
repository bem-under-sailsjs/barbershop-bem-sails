/**
 * CartController
 *
 * @description :: Server-side logic for managing Carts
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {



  /**
   * `CartController.show()`
   */
  show: function (req, res, next) {
    Cart.findOne({id: req.session.cart.id}, function(err, cart) {
        res.render({data: {cart: cart}});
    });
  },


  /**
   * `CartController.edit()`
   */
  edit: function (req, res) {
    return res.json({
      todo: 'edit() is not implemented yet!'
    });
  },


  /**
   * `CartController.delete()`
   */
  'delete': function (req, res) {
    return res.json({
      todo: 'delete() is not implemented yet!'
    });
  }
};

