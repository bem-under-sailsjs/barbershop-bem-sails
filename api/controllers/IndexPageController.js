/**
 * IndexPageController
 *
 * @description :: Server-side logic for managing indexpages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `IndexPageController.index()`
     */
    index: function(req, res, next) {
        Product.find(function(err, products) {
            if (err) next(err);

            res.render({
                data: {
                    products: products,
                    title: 'Welcome to indexPage',
                    indexPage: 'indexPage content'
                }
            });
        });
    }
};
