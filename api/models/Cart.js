/**
 * Cart.js
 *
 * @description :: Cart Model
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

var uuid = require('node-uuid');

module.exports = {

    attributes: {
        user: 'id',
        products: 'array'
    },

    beforeValidate: function(values, next) {
        // don't save _csrf token in database
        if(values._csrf) delete values._csrf;
        next();
    },

    /**
     * Add product to cart
     *
     * @param {String} productID
     */
    add: function(productID, req, callback) {

        // find or create user cart
        var user = req.session.User;

        if(!user && !req.session.sessionCartID) {
            // generate random UUID and save to session
            req.session.sessionCartID = uuid.v4();
            req.session.save();

            var data = {
                sessionCartID: req.session.sessionCartID,
                productID: productID
            };

            Cart.create(data, function(err, cart) {
                if(err) {
                    res.redirect('/product/' + productID);
                }

                console.log('created cart: ', cart);

            });
        } else if (req.session.sessionCartID) {
                Cart.update({
                    sessionCartID: req.session.sessionCartID,
                    productID: productID
                }, function(err, cart) {


                console.log("updated cart: ", cart);
            });
        }


        callback();

    }
};

