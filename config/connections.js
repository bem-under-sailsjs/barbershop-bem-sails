/**
 * Connections
 * (sails.config.connections)
 *
 * @see http://sailsjs.org/#/documentation/reference/sails.config/sails.config.connections.html
 */

module.exports.connections = {

    testDB: {
        adapter: 'sails-memory'
    },

    devMongodbServer: {
        adapter: 'sails-mongo',
        poolSize: 5,
        socketOptions: {
            noDelay: true,
            connectTimeoutMS: 0,
            socketTimeoutMS: 0
        }
    },

    prodMongodbServer: {
        adapter: 'sails-mongo',
        poolSize: 5,
        socketOptions: {
            noDelay: true,
            connectTimeoutMS: 0,
            socketTimeoutMS: 0
        }
    }
};
