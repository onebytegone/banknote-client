var Marionette = require('backbone.marionette'),
    RegionModalLayout = require('./RegionModalLayout.js'),
    ModalButtonView = require('./ModalButtonView.js'),
    _ = require('underscore');

var RegionModal = Marionette.Region.extend({
   el: "#modal",

   onShow: function(view){
      this.$el.modal('show');
   },

   present: function(view, buttonSpecs) {
      var layout = new RegionModalLayout();
      this.show(layout);
      layout.getRegion('content').show(view);

      var buttons = new ModalButtonView();

      var baseButtonSpec = {
         label: 'Button',
         classes: 'btn-default',
         data: {},
         handler: function() {}
      };

      _.map(buttonSpecs, function(spec) {
         var fullSpec = _.extend(baseButtonSpec, spec);
         buttons.addButton(
            fullSpec.label,
            fullSpec.classes,
            fullSpec.data,
            fullSpec.handler
         );
      });
      layout.getRegion('buttons').show(buttons);
   }
});

module.exports = RegionModal;
