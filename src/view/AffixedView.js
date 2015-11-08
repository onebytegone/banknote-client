/**
 * Used to affix a set of views together
 *
 * Copyright 2015 Ethan Smith
 */

 var Marionette = require('backbone.marionette');

var AffixedView = Marionette.ItemView.extend({
   el: '<div></div>',
   template: false,

   /**
    * @param view Marionette.View
    */
   affix: function(view, options) {
      this.triggerMethod('before:show', view, this, options);
      Marionette.triggerMethodOn(view, 'before:show', view, this, options);

      this._renderView(view);
      this.$el.append(view.$el);

      this.triggerMethod('show', view, this, options);
      Marionette.triggerMethodOn(view, 'show', view, this, options);
   },

   _renderView: function(view) {
      Marionette.triggerMethodOn(view, 'before:render', view);
      view.render();
      Marionette.triggerMethodOn(view, 'render', view);
   }
});

module.exports = AffixedView;
