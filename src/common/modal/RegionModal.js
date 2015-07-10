var Marionette = require('backbone.marionette'),
    RegionModalLayout = require('./RegionModalLayout.js');

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

module.exports = RegionModal;
