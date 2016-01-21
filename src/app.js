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
    layout = require('./js/layout.js'),

    // Controller
    PrimaryDisplayController = require('./js/controller/PrimaryDisplayController'),

    // View
    MainLayout = require('./js/view/MainLayout'),
    WelcomeScreen = require('./js/view/WelcomeScreen'),
    RegionModal = require('./js/common/modal/RegionModal.js'),
    ToolbarItem = require('./js/view/ToolbarItem'),

    // Util
    FileIO = require('./js/common/storage/FileIO.js');

require('./js/common/library/CurrencyInputStyler');


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
       }),
       controller = new PrimaryDisplayController(),
       openFile;

   Banknote.central.show(mainLayout);
   mainLayout.toolbar.show(downloadSheetItem);

   downloadSheetItem.on('element:click', function() {
      if (!openFile) {
         return;
      }

      var fileIO = new FileIO();
      fileIO.save(JSON.stringify(controller.exportToData()), openFile.name);
   });

   welcomeScreen.on('click:newsheet', function() {
      $.getJSON('demo.json', function(data) {
         var layoutView = controller.render(data);

         mainLayout.elements.show(layoutView);
      });

   });

   welcomeScreen.on('select:file', function(file) {
      var fileIO = new FileIO();
      fileIO.on('read:file', function(contents) {
         var layoutView = controller.render($.parseJSON(contents));

         mainLayout.elements.show(layoutView);
      });
      fileIO.read(file);

      openFile = file;
   });

   // Present welcome screen
   mainLayout.elements.show(welcomeScreen);
});

Banknote.start();

// Make Banknote available globally
global.Banknote = Banknote;
