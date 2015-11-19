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
   _.each(layout, function(settings) {
      var source = settings.source,
          multiSource = settings.sources,
          model;

      if (multiSource) {
         model = _.object(_.keys(multiSource), _.map(multiSource, function(sourceField) {
            return new AmountEntryCollection(data[sourceField]);
         }));
      } else {
         model = new AmountEntryCollection(data[source]);
      }

      var controller = new settings.type(settings.options);

      controller.on('collection:updated', function(collection) {
         console.log(collection);
         // TODO: pass back updated collection and re-render layout
         // TODO: regenerate json and output
      });

      container.affix(controller.render(model));
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
