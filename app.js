/**
 * Main entrypoint for banknote.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    _ = require('underscore'),

    // Config
    layout = require('./src/layout.js'),

    // Model
    AmountEntryCollection = require('./src/model/AmountEntryCollection'),

    // View
    MainLayout = require('./src/view/MainLayout'),
    AffixedView = require('./src/view/AffixedView'),
    RegionModal = require('./src/common/modal/RegionModal.js');

require('./src/common/library/CurrencyInputStyler');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});


var loadContainerChildren = function(container, layoutConfig, data, depth) {
   _.each(layoutConfig, function(settings) {
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

      if (typeof settings.type === 'function') {
         var controller = new settings.type(_.defaults(settings.options, { nestDepth: depth }));

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
      } else if (settings.type === 'bundle') {
         var block = createBundle(settings.items, settings.options, data, depth);
         container.affix(block);
      }
   });
};


var createBundle = function(subItems, options, data, depth) {
   var block = new SummaryBlock({
      model: new SummaryModel({
         nestDepth: depth,
         header: options.title
      })
   }),
      childContainer = new AffixedView();

   loadContainerChildren(childContainer, subItems, data, depth + 1);

   block.on('show', function() {
      block.content.show(childContainer);
   });

   return block;
};


var renderFromSourceIntoView = function(data, container) {
   container.empty();
   loadContainerChildren(container, layout, data, 0);
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
