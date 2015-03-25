var Mailgun = require('machinepack-mailgun');

module.exports = {

    /*
     * Send emails by mailgun API
     * @see https://mailgun.com/
     *
     * @param {Object} params
     */
    sendEmail: function(params, callback) {

        // Send an html email.
        Mailgun.sendHtmlEmail({
            apiKey: sails.config.email.apiKey,
            domain: sails.config.email.domain,
            toEmail: 'alexbaumgertner@yandex.ru',
            toName: 'Jane Doe',
            subject: 'Welcome, Jane!',

            textMessage: 'test',

            htmlMessage: '<p>test<p>',

            fromEmail: 'alex.baumgertner@gmail.com',
            fromName: 'Alex Baumgertner'
        }).exec({
            // An unexpected error occurred.
            error: function(err) {
                console.log('err: ', err);
            },
            // OK.
            success: function(data) {
                console.log('data: ', data);
                callback();
            }
        });
    }
};
