({
    shouldDeps: [
        {
            elems: [
                'header',
                'info-header',
                'image',
                'theme',
                'annotation',
                'content',
                'isbn',
                'balance',
                'e-buy-info',
                'spreads',
                'reviews',
                'publish-info',
                'columns',
                'price',
                'buy'
            ]
        },
        {
            elem: 'column',
            mods: { position: ['left', 'center', 'right'] }
        },
        {
            block: 'image'
        },
        {
            block: 'button',
            mods: {type: 'buy'}
        }
    ]
});
