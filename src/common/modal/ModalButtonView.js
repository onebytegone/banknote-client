var Marionette = require('backbone.marionette');

var ModalButtonView = Marionette.ItemView.extend({
   tagName: 'div',
   template: false,

   addButton: function(name) {
      this.$el.append("<h1>BUTTON</h1>");
   }
});

module.exports = ModalButtonView;
