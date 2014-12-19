/**
 * Product.js
 *
 * @description :: TODO: You might write a short summary of how this model works and what it represents here.
 * @docs        :: http://sailsjs.org/#!documentation/models
 */

module.exports = {

    attributes: {
        publisher: 'string', // Наименование журнала (издания)
        publishing_year: '', // Год издания
        number: 'number', // номер
        subject: 'string', // Тематика
        theme: 'string', // Тема
        annotation: 'string',  // Аннотация
        content: 'string', // Содержание
        isbn: 'string', // ISBN
        price: 'integer', // Цена
        tags: 'array', // Тэги
        image: 'string', // Обложка
        header: 'string', // заголовок
        balance: 'string', // Баланс
        text: 'string'  //
    },

    toJSON: function() {
        var obj = this.toObject();
        delete obj._csrf;

        return obj;
    },

    /**
     * Create stub to product
     */
    'new': function() {

    }
};

