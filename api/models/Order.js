/**
 * Order.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        name: 'string',
        email: 'string',
        phone: 'string',
        address: 'string',
        date: 'string',
        time: 'string',
        comment: 'string',
        cartID: 'string',
        userID: 'string',
        status: {
            type: 'string',
            enum: ['new', 'progressing', 'paid', 'delivering', 'delivered', 'canceled'],
            defaultsTo: 'new'
        }
        /* TODO: fix increment
        number: {
            type: 'integer',
            defaultsTo: 1,
            autoIncrement: true
        }*/
    },

    beforeValidate: function(values, next) {
        // don't save _csrf token in database
        if (values._csrf) delete values._csrf;
        next();
    }
};

