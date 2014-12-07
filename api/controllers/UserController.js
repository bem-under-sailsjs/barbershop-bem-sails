/**
 * UserController
 *
 * @description :: Server-side logic for managing users
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    show: function(req, res, next) {

        User.findOne(req.param('id'), function(err, user) {
            if (err) next(err);

            if (!user) {
                res.notFound()
            } else {
                res.view('user/show', {user: user});
            }
        });
    },

    edit: function(req, res, next) {
        User.findOne(req.param('id'), function(err, user) {
            if (err) next(err);

            res.view('user/edit', {user: user});
        });
    },

    update: function(req, res, next) {

        var data = req.params.all();

        // TODO: refactor
        data.isAdmin = data.isAdmin === 'yes';

        User.update(req.param('id'), data, function(err, user) {
            if (err) next(err);

            res.redirect('/user/' + data.id);
        });
    }
};

