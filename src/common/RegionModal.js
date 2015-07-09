var Marionette = require('backbone.marionette'),
    _ = require('underscore'),
    $ = require('jquery');

var RegionModal = Marionette.Region.extend({
   el: "#modal",

   onShow: function(view){
      this.$el.modal('show');
   },

   present: function(view) {
      var layout = new RegionModalLayout();
      this.show(layout);
      layout.getRegion('content').show(view);
   }
});


var RegionModalLayout = Marionette.LayoutView.extend({
   template: "#modal-view-template",

   regions: {
      content: "#content"
   },

   onRender: function () {
       // Get rid of that pesky wrapping-div.
       // Assumes 1 child element present in template.
       this.$el = this.$el.children();
       this.$el.unwrap();
       this.setElement(this.$el);
   }
});


module.exports = RegionModal;
