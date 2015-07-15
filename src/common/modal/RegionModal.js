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
      layout.events = {
         'click .save': function() {
            console.log('save');
         }
      };
      this.show(layout);
      layout.getRegion('content').show(view);

      var buttons = new ModalButtonView();
      buttons.addButton('Close', 'btn-default', {'dismiss': 'modal'});
      buttons.addButton('Save', 'btn-primary save');
      layout.getRegion('buttons').show(buttons);
   }
});

module.exports = RegionModal;
