/**
 * Policy Mappings
 * http://sailsjs.org/#/documentation/concepts/Policies
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.policies.html
 */
module.exports.policies = {

    '*': ['passport'],

    ProductController: {
        '*': ['passport', 'isAdmin'],
        'create': 'demo',
        'edit': 'demo',
        'addToCart': 'passport',
        'show': 'passport',
        'index': 'passport'
    },

    UserController: {
        '*': ['passport', 'isAdmin'],
        'show': ['passport', 'isAdminOrOwner'],
        'edit': ['passport', 'isAdminOrOwner'],
        'update': ['passport', 'isAdminOrOwner']
    },

    CartController: {
        'edit': ['passport', 'isAdminOrOwner'],
        'delete': ['passport', 'isAdmin']
    },

    PageController: {
        'edit': ['passport', 'isAdmin'],
        'create': ['passport', 'isAdmin'],
        'new': ['passport', 'isAdmin'],
        'update': ['passport', 'isAdmin'],
        'delete': ['passport', 'isAdmin']
    }
};
