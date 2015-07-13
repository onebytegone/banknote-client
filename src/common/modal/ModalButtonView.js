var Marionette = require('backbone.marionette');

var ModalButtonView = Marionette.ItemView.extend({
   tagName: 'div',
   template: false,

   addButton: function(name, classes) {
      this.$el.append('<button type="button" class="btn ' + classes + '">' + name + '</button>');
   }
});

module.exports = ModalButtonView;
