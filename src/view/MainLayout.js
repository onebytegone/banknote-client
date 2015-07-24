var Marionette = require('backbone.marionette');

var MainLayout = Marionette.LayoutView.extend({
   template: "#template-main",

   regions: {
      elements: ".jsElements"
   }
});

module.exports = MainLayout;
