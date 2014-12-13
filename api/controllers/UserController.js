/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    show: function(req, res) {

        User.findOneByEmail(req.param('email'), function(err, user) {
            res.view('user/show', {user: user});
        });
    }
};

