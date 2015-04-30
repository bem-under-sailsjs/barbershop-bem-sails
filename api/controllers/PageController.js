/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    index: function(req, res) {
        Page.find(function(err, pages) {
            res.render({data: {pages: pages}});
        });
    },

    show: function(req, res) {
        Page.findOne(req.param('id'), function(err, page) {
            res.render({data: {page: page}});
        });
    },

    showByUrl: function(req, res) {
        Page.findOne({url: req.path}, function(err, page) {
            res.render({data: {page: page}});
        });
    },

    create: function(req, res) {

        Page.create(req.params.all(), function(err, page) {
            res.status(201);

            if (page) {
                res.redirect(page.url);
            } else {
                res.redirect('/pages/');
            }
        });
    },

    edit: function(req, res) {
        Page.findOne(req.param('id'), function(err, page) {
            res.render({data: {page: page}});
        });
    },

    'new': function(req, res) {
        res.render({
            data: {
                page: {
                    title: 'string',
                    content: 'string',
                    url: 'sting'
                }
            }
        });
    },

    update: function(req, res) {
        Page.update(req.param('id'), req.params.all(), function(err, page) {

            console.log("page: ", page);

            res.redirect('/pages/' + req.param('id'));
        });
    },

    'delete': function(req, res) {
        Page.delete(req.param('url'), function(err) {
            res.redirect('/pages/');
        });
    }
};

