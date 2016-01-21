/**
 * Adds a marionette region to a bootstrap modal
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    RegionModalLayout = require('./RegionModalLayout.js'),
    ModalButtonView = require('./ModalButtonView.js'),
    _ = require('underscore');

var RegionModal = Marionette.Region.extend({
   el: "#modal",

   onShow: function(view){
      this.$el.modal('show');
   },

   present: function(title, view, buttonSpecs) {
      var layout = new RegionModalLayout(),
          buttons = new ModalButtonView(),
          baseButtonSpec;

      baseButtonSpec = {
         label: 'Button',
         classes: 'btn-default',
         data: {
            dismiss: 'modal'
         },
         handler: function() {}
      };

      // Setup the layour and present `view` as the content region
      layout.model = new Backbone.Model({
        'title': title
      });
      this.show(layout);
      layout.getRegion('content').show(view);

      // Setup and show buttons
      _.each(buttonSpecs, function(spec) {
         var fullSpec = _.defaults(spec, baseButtonSpec);
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
