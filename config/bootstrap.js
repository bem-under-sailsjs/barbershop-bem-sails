/**
 * Bootstrap
 * (sails.config.bootstrap)
 *
 * An asynchronous bootstrap function that runs before your Sails app gets lifted.
 * This gives you an opportunity to set up your data model, run jobs, or perform some special logic.
 *
 * For more information on bootstrapping your app, check out:
 * http://sailsjs.org/#/documentation/reference/sails.config/sails.config.bootstrap.html
 */

var fs = require('fs');

module.exports.bootstrap = function(cb) {

    // https://github.com/sahanDissanayake/sails-passport
    sails.services.passport.loadStrategies();

    // It's very important to trigger this callback method when you are finished
    // with the bootstrap!  (otherwise your server will never lift, since it's waiting on the bootstrap)

    if (!fs.existsSync(sails.config.fileUpload.uploadDir)) {
        fs.mkdirSync(sails.config.fileUpload.uploadDir, {mode: '0775'});
    }

    sails.BEMTREE = require('../views/desktop.bundles/merged/merged.bemtree.js').BEMTREE;
    sails.BEMHTML = require('../views/desktop.bundles/merged/merged.bemhtml.js').BEMHTML;

    // TODO: experiment
    sails.bemRender = function(res, data) {

        sails
            .BEMTREE
            .apply({data: data})
            .then(function(bemjson) {
                res.set('Content-Type', 'text/html');
                res.send(sails.BEMHTML.apply(bemjson));
            });
    };

    cb();
};
