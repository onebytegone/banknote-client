var _ = require('underscore'),
    ControlBones;

ControlBones = function() { };
ControlBones.prototype = {};

/**
 * This is called to reload the view using
 * the latest data from the model.
 */
ControlBones.prototype.reload = function() {
   // noop
};


ControlBones.extend = function(prototypeAdditions) {
   var parent = this,
       child;

   child = function(){
      return parent.apply(this, arguments);
   };

   _.extend(child, parent);

   if (prototypeAdditions) {
      _.extend(child.prototype, prototypeAdditions);
   }

   return child;
};

module.exports = ControlBones;
