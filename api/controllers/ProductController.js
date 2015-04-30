/**
 * ProductController
 *
 * @description :: Server-side logic for managing Products
 * @help        :: See http://links.sailsjs.org/docs/controllers
 */

module.exports = {

    /**
     * `ProductController.index()`
     */
    index: function(req, res) {
        Product.find(function(err, products) {
            res.render({data: {products: products}});
        });
    },

    /**
     * `ProductController.show()`
     */
    show: function(req, res) {
        Product.findOne({id: req.param('id')}, function(err, product) {
            res.render({data: {product: product}});
        });
    },

    addToCart: function(req, res) {

        Product.findOne(req.param('id'), function(err, product) {
            if (err) console.log(err);

            Cart.add(
                {
                    productID: product.id,
                    quantity: 1, // one product`
                    price: product.price,
                    image: product.image,
                    header: product.header,
                    theme: product.theme,
                    title: product.title
                },
                req,
                function(data) {
                    res.redirect('/cart/');
                });

        });
    },

    /**
     * `ProductController.create()`
     */
    create: function(req, res, next) {

        req.file('image')
            .upload({
                dirname: sails.config.fileUpload.uploadDir
            }, function(err, file) {
                if (err) return next(err);

                var productData = req.params.all();
                productData.image = getImageName(file);

                // TODO: rewrite
                Product.create(productData, function(err, product) {
                    if (err) return next(err);

                    res.status(201);
                    res.redirect('/product/' + product.id);
                });

            });

    },

    /**
     * `ProductController.edit()`
     */
    edit: function(req, res) {
        Product.findOne({id: req.param('id')}, function(err, product) {
            res.render({data: {product: product}});
        });
    },

    /**
     * `ProductController.new()`
     */
    'new': function(req, res) {
        res.render({
            data: {
                product: {
                    publisher: 'string', // Наименование журнала (издания)
                    publishing_year: 'integer', // Год издания
                    number: 'integer', // номер
                    subject: 'string', // Тематика
                    theme: 'string', // Тема
                    annotation: 'string',  // Аннотация
                    content: 'string', // Содержание
                    isbn: 'string', // ISBN
                    price: 'integer', // Цена
                    //tags: 'array', // Тэги
                    image: 'string', // Обложка
                    header: 'string', // заголовок
                    balance: 'integer' // Баланс

                }
            }
        });
    },

    /**
     * `ProductController.update()`
     */
    update: function(req, res, next) {

        req.file('image')
            .upload({
                dirname: sails.config.fileUpload.uploadDir
            }, function(err, file) {
                if (err) return next(err);

                var productData = req.params.all();
                productData.image = getImageName(file);

                console.log("productData.image: ", productData.image);

                Product.update(req.param('id'), productData, function(err, product) {
                    if (err) res.redirect('/product/' + req.param('id') + '/edit');

                    res.status(201);
                    res.redirect('/product/' + req.param('id'));
                });

            });
    },

    /**
     * `ProductController.delete()`
     */
    'delete': function(req, res, next) {
        var productId = req.param('id');

        Product.findOne({id: productId}, function(err, product) {

            Product.delete({id: productId}, function(err) {
                next();
            });

        });
    }
};

/**
 * Get file name from `file` object
 *
 * @param {Object} file
 * @return {String} file name
 */
function getImageName(file) {
    if (file && file[0] && file[0].fd) {
        return file[0].fd.split('/').pop();
    }
}
