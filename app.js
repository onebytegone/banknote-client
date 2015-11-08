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
    CategorizedController = require('./src/controller/CategorizedController');
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
      'source': 'income'
   },
   {
      'heading': 'Expenses',
      'type': CategorizedController,
      'source': 'expenses'
   }
];

Banknote.addInitializer(function(options) {
   $.getJSON('demo.json', function(data) {

      _.each(summaryConfig, function(settings) {
         var collection = new AmountEntryCollection(data[settings.source]);

         var controller = new settings.type({
            title: settings.heading
         });
         Banknote.central.show(controller.render(collection));
      });
   });
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
