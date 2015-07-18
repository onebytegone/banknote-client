var Marionette = require('backbone.marionette'),
    ListView = require('./ListView');

var MainLayout = Marionette.LayoutView.extend({
   template: "#template-main",

   regions: {
      elements: ".jsElements"
   }
});

module.exports = MainLayout;
