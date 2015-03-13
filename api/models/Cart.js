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
        sessionCartID: 'String', // TODO: set unique
        items: 'array' // [{ productID: productID, quantity: value }]
    },

    beforeValidate: function(values, next) {
        // don't save _csrf token in database
        if (values._csrf) delete values._csrf;
        next();
    },

    /**
     * Add product to cart
     *
     * @param {Object} data
     */
    add: function(data, req, callback) {
        // find or create user cart
        var user = req.session.User;

        // Session hasnt Cart
        if (!user) {

            if (!req.session.sessionCartID) {
                console.log("NEW req.session.sessionCartID: ", req.session.sessionCartID);
                // generate random UUID and save to session
                req.session.sessionCartID = uuid.v4();
                req.session.save();
            }

            // TODO: rewrite!
            Cart.findOne({sessionCartID: req.session.sessionCartID},
                function(err, cart) {
                    if (err) {
                        console.log("err: ", err);
                    }

                    var isAlreadyInCart = false;

                    if (cart) {

                        if (cart.items.length > 0) {

                            // Check if product already present in cart
                            cart.items.forEach(function(item, index) {
                                if (cart.items[index].productID === data.productID) {
                                    cart.items[index].quantity = data.quantity + cart.items[index].quantity;
                                    isAlreadyInCart = true;
                                }
                            });
                        }

                        if (!isAlreadyInCart) {
                            cart.items.push(data);
                        }

                        Cart.update(
                            {sessionCartID: req.session.sessionCartID},
                            {
                                items: cart.items
                            },
                            function() {
                                console.log("err: ", err);
                                callback(cart);
                            });

                    } else {

                        Cart.create({
                                sessionCartID: req.session.sessionCartID,
                                items: [data]
                            },
                            function(err, cart) {
                                console.log("err: ", err);
                                callback(cart);
                            });

                    }
                });

        }
    }
};

