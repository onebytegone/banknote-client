/**
 * This is the base class for the calculation controllers
 * in banknote. This is not designed to be use by itself,
 * but rather extended into something more functional.
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    Backbone = require('backbone'),
    SummaryModel = require('../model/SummaryModel'),
    ControlBones;

ControlBones = function(options) {
   var self = this;

   // Copy all options to object
   _.each(options, function(value, key) {
      self[key] = value;
   });
};

ControlBones.prototype = {
   classes: '',
   nestDepth: 0,

   /**
    * This is called to render the view using
    * the latest data from the model.
    */
   render: function() {
      // Default to noop
   },

   /**
    * @return Backbone.Model
    */
   _createSummaryModel: function() {
      return new SummaryModel({
         'nestDepth': SummaryModel.sanitizeNestDepth(this.nestDepth),
         'header': this.title,
         'classes': this.classes
      });
   }
};

// Benefit from Backbone.Events
_.extend(ControlBones.prototype, Backbone.Events);

// Snag the extend function from Backbone.Model
ControlBones.extend = Backbone.Model.extend;

module.exports = ControlBones;
