var fs = require('fs');
var path = require('path');

var Mailgun = require('machinepack-mailgun');
var ejs = require('ejs');
var async = require('async');

var template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'email-templates', 'order.ejs'), 'utf-8'));

module.exports = {

    /*
     * Send emails by mailgun API with machinepack-mailgun
     *
     * @see https://documentation.mailgun.com
     * @see http://node-machine.org/machinepack-mailgun
     *
     * @param {Object} params
     * @param {Function} callback
     */
    sendEmail: function(params, callback) {
        var order = params.order,
            htmlMessage,
            textMessage;

        Cart.findOne(order.cartID, function(err, cart) {
            var items = cart.items;


            if (items && items.length > 0) {
                order.items = items;

                order.totalPrice = items.reduce(function(totalPrice, item) {
                    return totalPrice + (item.quantity * item.price);
                }, 0); // 0 – init value

                try {
                    textMessage = JSON.stringify(items);
                    htmlMessage = template({order: order});
                } catch(e) {}

                var mailParam = {
                    apiKey: sails.config.email.apiKey,
                    domain: sails.config.email.domain,

                    toEmail: sails.config.manager.email,
                    toName: sails.config.manager.name,

                    subject: 'Заказ номер: ' + order.cartID,

                    textMessage: textMessage,
                    htmlMessage: htmlMessage,

                    fromEmail: sails.config.manager.email,
                    fromName: sails.config.manager.name
                };

                async.parallel({
                    'mailToCustomer': function(callback) {
                        mailParam.toEmail = order.email;
                        mailParam.toName = order.name;

                        Mailgun.sendHtmlEmail(mailParam).exec({
                            error: function(err) {callback(err);},
                            success: function(data) {callback(null, data);}
                        });

                    },
                    'mailToManager': function(callback) {
                        mailParam.subject = 'Сделан заказ номер: ' + order.cartID;

                        Mailgun.sendHtmlEmail(mailParam).exec({
                            error: function(err) {callback(err);},
                            success: function(data) {callback(null, data);}
                        });
                    }
                }, function(err, res) {
                    callback(err, res);
                });

            }
        });

    }
};
