var Marionette = require('backbone.marionette');

var MainLayout = Marionette.LayoutView.extend({
   template: "#template-main",

   regions: {
      elements: ".jsElements",
      toolbar: ".appbanner .toolbar"
   }
});

module.exports = MainLayout;
