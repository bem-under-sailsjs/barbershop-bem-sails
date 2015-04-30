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
        items: 'array', // [{ productID: productID, quantity: value }]
        quantity: {
            type: 'integer',
            defaultsTo: 0
        }
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
        var user = req.session.User,
            cartID;

        if(user) {
            cartID = user.cartID;
        } else if (req.session.cart) {
            cartID = req.session.cart.id;
        }

        if (cartID) {
            // TODO: rewrite!
            Cart.findOne({id: req.session.cart.id}, function(err, cart) {
                if (err) {callback(err);}

                if(!cart) {
                    req.session.cart.id = null;
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

                    cart.quantity = cart.quantity + data.quantity;

                    Cart.update(
                        {id: req.session.cart.id},
                        {
                            items: cart.items,
                            quantity: cart.quantity
                        },
                        function() {
                            console.log("err: ", err);

                            req.session.cart = cart;
                            req.session.save();

                            callback(cart);
                        });

                }

            }.bind(this));

        } else {
            Cart.create({items: [data], quantity: data.quantity}, function(err, cart) {
                if (err) {callback(err);}

                req.session.User.cartID = cart.id;
                req.session.cart = cart;

                req.session.save();

                callback(cart);
            });
        }
    }
};
