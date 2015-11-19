var _ = require('underscore'),
    Backbone = require('backbone'),
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
      return new Backbone.Model({
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
