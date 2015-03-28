var fs = require('fs');
var path = require('path');

var Mailgun = require('machinepack-mailgun');
var ejs = require('ejs');
var template = ejs.compile(fs.readFileSync(path.resolve(__dirname, 'email-templates', 'order.ejs'), 'utf-8'));

module.exports = {

    /*
     * Send emails by mailgun API
     * @see https://mailgun.com/
     *
     * @param {Object} params
     */
    sendEmail: function(params, callback) {
        var order = params.order,
            htmlMessage,
            textMessage;

        Cart.findOne(order.cartID, function(err, cart) {
            var items = cart.items;


            if (items && items.length > 0) {
                order.items = items;

                try {
                    textMessage = JSON.stringify(items);
                    htmlMessage = template({order: order});
                } catch(e) {}

                // Send an html email.
                Mailgun.sendHtmlEmail({

                    apiKey: sails.config.email.apiKey,
                    domain: sails.config.email.domain,
                    toEmail: 'alexbaumgertner@yandex.ru',
                    toName: order.name,
                    subject: 'Заказ номер: ' + order.cartID,

                    textMessage: textMessage,
                    htmlMessage: htmlMessage,

                    fromEmail: 'alex.baumgertner@gmail.com',
                    fromName: 'Alex Baumgertner'

                }).exec({
                    // An unexpected error occurred.
                    error: function(err) {
                        console.log('Mailgun err: ', err);
                    },
                    // OK.
                    success: function(data) {
                        console.log('Mailgun data: ', data);
                        callback();
                    }
                });

            }
        });

    }
};
