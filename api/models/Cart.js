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

        // Session hasn't Cart
        if (!user) {

            if (!req.session.sessionCartID) {

                Cart.create({items: [data]}, function(err, cart) {
                        if (err) {callback(err);}

                        req.session.sessionCartID = cart.id;
                        req.session.save();

                        callback(cart);
                    });

            } else {
                // TODO: rewrite!
                Cart.findOne({id: req.session.sessionCartID}, function(err, cart) {
                        if (err) {callback(err);}

                    if(!cart) {
                        req.session.sessionCartID = null;
                        req.session.save();
                        this.add(data, req, callback);

                    } else {
                        var isAlreadyInCart = false;

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
                            {id: req.session.sessionCartID},
                            {
                                items: cart.items
                            },
                            function() {
                                console.log("err: ", err);
                                callback(cart);
                            });

                    }

                }.bind(this));
            }

        }
    }
};

