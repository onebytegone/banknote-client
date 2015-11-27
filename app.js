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

    // Controller
    PrimaryDisplayController = require('./src/controller/PrimaryDisplayController'),

    // View
    MainLayout = require('./src/view/MainLayout'),
    RegionModal = require('./src/common/modal/RegionModal.js');

require('./src/common/library/CurrencyInputStyler');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});

Banknote.addInitializer(function(options) {
   var mainLayout = new MainLayout();

   Banknote.central.show(mainLayout);

   $.getJSON('demo.json', function(data) {
      var controller = new PrimaryDisplayController(),
          layoutView = controller.render(data);

      mainLayout.elements.show(layoutView);
   });
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
