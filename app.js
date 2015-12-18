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
    RegionModal = require('./src/common/modal/RegionModal.js'),
    ToolbarItem = require('./src/view/ToolbarItem'),

    // Util
    FileIO = require('./src/common/storage/FileIO.js');

require('./src/common/library/CurrencyInputStyler');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});

Banknote.addInitializer(function(options) {
   var mainLayout = new MainLayout(),
       welcomeScreen = new WelcomeScreen(),
       downloadSheetItem = new ToolbarItem({
          model: new Backbone.Model({
             'icon': 'fa-download'
          })
       });

   Banknote.central.show(mainLayout);
   mainLayout.toolbar.show(downloadSheetItem);

   welcomeScreen.on('click:newsheet', function() {
      $.getJSON('demo.json', function(data) {
         var controller = new PrimaryDisplayController(),
             layoutView = controller.render(data);

         mainLayout.elements.show(layoutView);
      });

   });

   welcomeScreen.on('select:file', function(file) {
      console.log(file);
      var fileIO = new FileIO();
      fileIO.on('read:file', function(contents) {
         var controller = new PrimaryDisplayController(),
             layoutView = controller.render($.parseJSON(contents));

         mainLayout.elements.show(layoutView);
      });
      fileIO.read(file);
   });

   // Present welcome screen
   mainLayout.elements.show(welcomeScreen);
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
