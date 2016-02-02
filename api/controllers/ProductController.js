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
    index: function(req, res, next) {
        /*Product.find(function(err, products) {
         if (err) next(err);

         res.render({data: {products: products}});
         });*/

        var productsDemo = [
            {
                "id": 1,
                image: '1.jpg',
                title: 'Набор для путешествий «Baxter of California»',
                price: 2900
            },
            {
                "id": 2,
                image: '2.jpg',
                title: 'Увлажняющий кондиционер «Baxter of California»',
                price: 750
            },
            {
                "id": 3,
                image: '3.jpg',
                title: ' Гель для волос «SUAVECITO»',
                price: 290
            },
            {
                "id": 4,
                image: '4.jpg',
                title: 'Глина для укладки волос «American crew»',
                price: 500
            },
            {
                "id": 5,
                image: '5.jpg',
                title: 'Гель для волос «AMERICAN CREW»',
                price: 300
            },
            {
                "id": 6,
                image: '6.jpg',
                title: 'Набор для бритья «Baxter of California»',
                price: 3900
            }
        ];

        res.render({ data: { products: productsDemo } });
    },

    /**
     * `ProductController.show()`
     */
    show: function(req, res, next) {
        Product.findOne({ id: req.param('id') }, function(err, product) {
            if (err) next(err);

            res.render({ data: { product: product } });
        });
    },

    addToCart: function(req, res, next) {

        Product.findOne(req.param('id'), function(err, product) {
            if (err) next(err);

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

        req.file('image').upload({
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
    edit: function(req, res, next) {
        Product.findOne({ id: req.param('id') }, function(err, product) {
            if (err) next(err);

            res.render({ data: { product: product } });
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

        req.file('image').upload({
                                     dirname: sails.config.fileUpload.uploadDir
                                 }, function(err, file) {
            if (err) return next(err);

            var productData = req.params.all();
            productData.image = getImageName(file);

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

        Product.findOne({ id: productId }, function(err, product) {
            if (err) next(err);

            Product.delete({ id: productId }, function(err) {
                if (err) next(err);

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
