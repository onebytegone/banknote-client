var Marionette = require('backbone.marionette');

var RegionModalLayout = Marionette.LayoutView.extend({
   template: "#modal-view-template",

   regions: {
      content: "#content",
      buttons: "#buttons"
   },

   onRender: function () {
       // Get rid of that pesky wrapping-div.
       // Assumes 1 child element present in template.
       this.$el = this.$el.children();
       this.$el.unwrap();
       this.setElement(this.$el);
   }
});

module.exports = RegionModalLayout;
