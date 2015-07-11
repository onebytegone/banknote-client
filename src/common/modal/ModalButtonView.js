var Marionette = require('backbone.marionette');

var ModalButtonView = Marionette.ItemView.extend({
   tagName: 'div',
   template: false,

   addButton: function(name) {
      console.log("adding: " + name);
   }
});

module.exports = ModalButtonView;
