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
        items: 'object' // {productID_1: quantity_1, productID_2: quantity_2}
    },

    beforeValidate: function(values, next) {
        // don't save _csrf token in database
        if (values._csrf) delete values._csrf;
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

        // Session hasnt Cart
        if (!user) {

            if (!req.session.sessionCartID) {
                console.log("NEW req.session.sessionCartID: ", req.session.sessionCartID);
                // generate random UUID and save to session
                req.session.sessionCartID = uuid.v4();
                req.session.save();
            }

            console.log("req.session.sessionCartID: ", req.session.sessionCartID);

            var data = {'$inc': {}};
            data['$inc']['items.ProductID_' + productID] = 1;

            Cart.find({sessionCartID: req.session.sessionCartID}, function(err, data) {
                console.log("find data: ", data);
            });

            // UPDATE
            Cart.update(
                // query
                {sessionCartID: req.session.sessionCartID},

                // data
                data,

                // options
                {
                    'upsert': true
                },
                function(err, cart) {
                    if (err) {res.redirect('/product/' + productID);}

                    callback(cart);
                });

        }
    }
};

