/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        image: 'string',
        header: 'string',
        theme: 'string',
        annotation: 'string',
        content: 'string',
        isbn: 'string',
        balance: 'string',
        text: 'string',
        price: 'integer'
    },

    toJSON: function() {
        var obj = this.toObject();
        delete obj._csrf;

        return obj;
    },

    /**
     * Create stub to product
     */
    'new': function() {

    }
};

