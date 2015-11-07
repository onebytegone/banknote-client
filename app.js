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

Banknote.addInitializer(function(options) {
   $.getJSON('demo.json', function(data) {
      var controller = new CategorizedController({
         title: 'Income Totals'
      });
      Banknote.central.show(controller.render(data.income));
   });
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
