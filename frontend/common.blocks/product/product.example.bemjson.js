var BEMJSON = {
    block: 'product',
    content: [
        {
            elem: 'image',
            product: {
                block: 'link',
                url: '/product/1',
                content: {
                    block: 'image',
                    width: '138px',
                    url: '1.jpg',
                    title: 'Набор для путешествий «Baxter of California»',
                    alt: 'Набор для путешествий «Baxter of California»'
                }
            }
        },
        /* ... */

        { elem: 'title', product: product },
        { elem: 'buy', product: product, data: this.ctx.data }
    ]
};
