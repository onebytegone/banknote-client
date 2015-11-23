/**
 * Main entrypoint for banknote.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    _ = require('underscore'),
    layout = require('./src/layout.js'),
    MainLayout = require('./src/view/MainLayout'),
    RegionModal = require('./src/common/modal/RegionModal.js'),
    AffixedView = require('./src/view/AffixedView'),
    AmountEntryCollection = require('./src/model/AmountEntryCollection');
require('./src/common/library/CurrencyInputStyler');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});


var renderFromSourceIntoView = function(data, container) {
   container.empty();

   _.each(layout, function(settings) {
      var source = settings.source,
          multiSource = settings.sources,
          preferredSource = settings.sources || source,
          supplementary = settings.supplementary,
          model,
          createCollection;

      /**
       * Recursively create the collections from its field name for the
       * source data. When the field is an object or array, try to create
       * sub models from its contents.
       *
       * @param field String, Array, Object
       * @return String, Array, or Object
       */
      createCollection = function(field) {
         if (Array.isArray(field)) {
            return _.map(field, function(sourceField) {
               return createCollection(sourceField);
            });
         } else if (field && (typeof field  === "object")) {
            return _.object(_.keys(field), createCollection(_.values(field)));
         }

         return new AmountEntryCollection(data[field]);
      };
      model = createCollection(preferredSource);

      // When `supplementary` is used, go and map the values to each of
      // the requested fields. Since we don't know what type they are
      // supposed to be, just copy the data across.
      if (supplementary) {
         supplementary = _.mapObject(supplementary, function (key) {
            return data[key];
         });
      }

      var controller = new settings.type(settings.options);

      controller.on('collection:updated', function(collection) {
         if (source === undefined) {
            throw 'Update event was called when we do not have a single source. Multisource updates are not supported at this time.';
         }

         // Update the source data with the updates
         data[source] = collection.toJSON();

         // Re-render using updated data
         renderFromSourceIntoView(data, container);
      });

      container.affix(controller.render(model, supplementary));
   });
};

Banknote.addInitializer(function(options) {
   var mainLayout = new MainLayout(),
       summaryContainer = new AffixedView();

   Banknote.central.show(mainLayout);
   mainLayout.elements.show(summaryContainer);

   $.getJSON('demo.json', function(data) {
      renderFromSourceIntoView(data, summaryContainer);
   });
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
