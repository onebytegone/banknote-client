/**
 * Main entrypoint for banknote.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    _ = require('underscore'),
    MainLayout = require('./src/view/MainLayout'),
    RegionModal = require('./src/common/modal/RegionModal.js'),
    CategorizedController = require('./src/controller/CategorizedController'),
    DifferenceController = require('./src/controller/DifferenceController'),
    AffixedView = require('./src/view/AffixedView'),
    AmountEntryCollection = require('./src/model/AmountEntryCollection');
require('./src/common/library/CurrencyInputStyler');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});

var summaryConfig = [
   {
      'heading': 'Income Totals',
      'type': CategorizedController,
      'source': 'income',
      'options': {
         'title': 'Income Totals',
      }
   },
   {
      'type': CategorizedController,
      'source': 'expenses',
      'options': {
         'title': 'Expenses',
      }
   },
   {
      'type': DifferenceController,
      'sources': {
         'subtrahend': 'expenses',
         'minuend': 'income'
      },
      'options': {
         'title': 'Monthly Net',
      }
   }
];

Banknote.addInitializer(function(options) {

   var summaryContainer = new AffixedView();
   Banknote.central.show(summaryContainer);

   $.getJSON('demo.json', function(data) {

      _.each(summaryConfig, function(settings) {
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
         summaryContainer.affix(controller.render(model));
      });
   });
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
