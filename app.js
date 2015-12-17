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
    WelcomeScreen = require('./src/view/WelcomeScreen'),
    RegionModal = require('./src/common/modal/RegionModal.js');

require('./src/common/library/CurrencyInputStyler');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});

Banknote.addInitializer(function(options) {
   var mainLayout = new MainLayout(),
       welcomeScreen = new WelcomeScreen();

   Banknote.central.show(mainLayout);

   // Present welcome screen
   mainLayout.elements.show(welcomeScreen);
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
