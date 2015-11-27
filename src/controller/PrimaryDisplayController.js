/**
 * Manages the creation and updating of the various
 * controllers for the layout.
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    Marionette = require('backbone.marionette'),
    ControlBones = require('./ControlBones');

var PrimaryDisplayController = function(options) {
   var self = this;

   // Copy all options to object
   _.each(options, function(value, key) {
      self[key] = value;
   });
};

PrimaryDisplayController.prototype = {

   /**
    * @param rawData [{...}] - Parsed data to render
    * @return Marionette.ItemView
    */
   render: function(rawData) {
      return new AffixedView();
   }
};

module.exports = PrimaryDisplayController;
