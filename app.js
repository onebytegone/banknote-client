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
    ParticularsCollection = require('./src/view/ParticularsCollection'),
    CategorizedController = require('./src/controller/CategorizedController');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});

Banknote.addInitializer(function(options) {
   var layout = new MainLayout();
   Banknote.central.show(layout);

   var particularsCollection = new ParticularsCollection({
      'collection' :  new Backbone.Collection(options.tables)
   });
   layout.elements.show(particularsCollection);
});

var controllers = [
   new CategorizedController({
      title: 'Income Totals',
      source: 'income'
   }),
   new CategorizedController({
      title: 'Fund Routing',
      source: 'routing',
      editable: true
   }),
   new CategorizedController({
      title: 'Expenses',
      source: 'expenses'
   })
];

$.getJSON('demo.json', function(data) {
   Banknote.start({
      'tables': _.map(controllers, function(controller) {
         return controller.render(data);
      })
   });
});

// Make Banknote available globally
global.Banknote = Banknote;
