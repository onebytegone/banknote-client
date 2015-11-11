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

ControlBones.prototype = {};

/**
 * This is called to render the view using
 * the latest data from the model.
 */
ControlBones.prototype.render = function() {
   // noop
};


   /**
    * @return Backbone.Model
    */
ControlBones.prototype._createSummaryModel = function() {
      return new Backbone.Model({
         'header': this.title
      });
   };


ControlBones.extend = function(prototypeAdditions) {
   var parent = this,
       child;

   child = function(){
      return parent.apply(this, arguments);
   };

   _.extend(child, parent);
   _.extend(child.prototype, parent.prototype);

   if (prototypeAdditions) {
      _.extend(child.prototype, prototypeAdditions);
   }

   return child;
};

module.exports = ControlBones;
