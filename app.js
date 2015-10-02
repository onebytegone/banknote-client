/**
 * Main entrypoint for banknote.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    $ = require('jquery'),
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

var income = new CategorizedController({
       title: 'Income Totals',
       source: 'income'
    });

var expenses = new CategorizedController({
       title: 'Expenses',
       source: 'expenses'
    });

$.getJSON('demo.json', function(data) {
   var tables = [];

   tables.push(income.render(data));
   tables.push(expenses.render(data));

   Banknote.start({ 'tables': tables});
});

// Make Banknote available globally
global.Banknote = Banknote;
