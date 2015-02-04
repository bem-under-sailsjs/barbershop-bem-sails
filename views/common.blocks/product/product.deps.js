({
    shouldDeps: [
        {
            elems: ['image', 'title', 'info', 'price', 'buy', 'link']
        },
        {
            block: 'button'
        },
        {
            block: 'button',
            mods: {type: 'buy'}
        },
        {
            block: 'link'
        },
        {
            block: 'price'
        },
        {
            block: 'image'
        },
        {
            mods: { type: 'actions' }
        }
    ]
});
