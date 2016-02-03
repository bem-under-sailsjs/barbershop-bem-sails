modules.define(
  'product',
  ['i-bem__dom', 'jquery'],
  function(provide, BEMDOM, $) {
    provide(BEMDOM.decl(
      this.name,
      {
        onSetMod: {
          'js': {
            'inited': function() {
              var form = this.findBlockInside('form');

              form.domElem.on('submit', this.addToCard);
            }
          }
        },

        addToCard: function(e) {
          e.preventDefault();
          $.ajax({});
        }
      }
    ));

  });
