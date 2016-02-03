modules.define(
  'product',
  ['i-bem__dom', 'jquery'],
  function(provide, BEMDOM, $) {
    provide(BEMDOM.decl(
      this.name,
      {
        onSetMod: {
          'js': { 'inited': function() { console.log("this: ", this); } }
        },

        addToCard: function() {
          $.ajax({});
        }
      },
      {
        live: function () {
          this.liveBindTo('buy', 'click', this.prototype.addToCard);
        }
      }));

  });
