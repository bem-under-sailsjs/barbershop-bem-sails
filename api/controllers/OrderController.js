/**
 * OrderController
 *
 * @description :: Server-side logic for managing orders
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

  /**
   * `OrderController.create()`
   */
  create: function (req, res, next) {
      console.log('params: ', req.params);

      next();
  }
};

