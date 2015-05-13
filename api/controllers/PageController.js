/**
 * PageController
 *
 * @description :: Server-side logic for managing Pages
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

var url = require('url');

module.exports = {

    index: function(req, res, next) {
        Page.find(function(err, pages) {
            if (err) next(err);

            res.render({data: {pages: pages}});
        });
    },

    show: function(req, res, next) {
        Page.findOne(req.param('id'), function(err, page) {
            if (err) next(err);

            res.render({data: {page: page}});
        });
    },

    showByUrl: function(req, res, next) {
        Page.findOne({url: req.path}, function(err, page) {
            if (err) next(err);

            res.render({data: {page: page}});
        });
    },

    create: function(req, res, next) {

        Page.create(req.params.all(), function(err, page) {
            if (err) next(err);

            res.status(201);

            if (page) {
                res.redirect(page.url);
            } else {
                res.redirect('/pages/');
            }
        });
    },

    edit: function(req, res, next) {
        Page.findOne(req.param('id'), function(err, page) {
            if (err) next(err);

            res.render({data: {page: page}});
        });
    },

    'new': function(req, res) {
        var pathname;

        if (req.headers.referer) {
            pathname = url.parse(req.headers.referer).pathname;
        }

        res.render({
            data: {
                page: {
                    title: 'string',
                    content: 'Содержание страницы',
                    url: pathname
                }
            }
        });
    },

    update: function(req, res, next) {
        Page.update(req.param('id'), req.params.all(), function(err, page) {
            if (err) next(err);

            res.redirect('/pages/' + req.param('id'));
        });
    },

    'delete': function(req, res, next) {
        Page.delete(req.param('url'), function(err) {
            if (err) next(err);

            res.redirect('/pages/');
        });
    }
};

