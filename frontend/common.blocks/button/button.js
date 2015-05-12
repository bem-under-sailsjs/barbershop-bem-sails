/**
 * @module button
 */

modules.define(
    'button',
    ['i-bem__dom', 'control', 'jquery', 'dom', 'functions', 'keyboard__codes'],
    function(provide, BEMDOM, Control, $, dom, functions, keyCodes) {

        /**
         * @exports
         * @class button
         * @augments control
         * @bem
         */
        provide(BEMDOM.decl({ block : this.name, baseBlock : Control }, /** @lends button.prototype */{

            onSetMod : {
                'js' : {
                    'inited' : function() {
                        //this.__base.apply(this, arguments);
                        var _this = this;
                        this.bindTo('click', function(e) {
                            _this.setMod('tohidden', Math.random());
                        });
                    }
                },
                'tohidden': {
                    '*': function(modName, modVal, oldModVal) {
                        this.domElem.fadeTo(300, modVal);
                    }
                }
            }

        }, /** @lends button */{

        }));

    });
