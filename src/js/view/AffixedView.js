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

      this.affixOnShow(view, options);

      this.triggerMethod('show', view, this, options);
   },

   /**
    * @param view Marionette.View
    */
   affixOnShow: function(view, options) {
      Marionette.triggerMethodOn(view, 'before:show', view, this, options);

      this._renderView(view);
      this.$el.append(view.$el);

      Marionette.triggerMethodOn(view, 'show', view, this, options);
   },

   empty: function() {
      this.$el.empty();
   },

   _renderView: function(view) {
      Marionette.triggerMethodOn(view, 'before:render', view);
      view.render();
      Marionette.triggerMethodOn(view, 'render', view);
   }
});

module.exports = AffixedView;
