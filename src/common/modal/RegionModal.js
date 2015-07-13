var Marionette = require('backbone.marionette'),
    RegionModalLayout = require('./RegionModalLayout.js'),
    ModalButtonView = require('./ModalButtonView.js');

var RegionModal = Marionette.Region.extend({
   el: "#modal",

   onShow: function(view){
      this.$el.modal('show');
   },

   present: function(view) {
      var layout = new RegionModalLayout();
      this.show(layout);
      layout.getRegion('content').show(view);

      var buttons = new ModalButtonView();
      buttons.addButton('Close', 'btn-default');
      buttons.addButton('Save', 'btn-primary');
      layout.getRegion('buttons').show(buttons);
   }
});

module.exports = RegionModal;
