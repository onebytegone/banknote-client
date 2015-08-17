var Marionette = require('backbone.marionette');

var TableBones = Marionette.CompositeView.extend({
   tagName: 'table',
   className: 'table',
   childViewOptions: function() {
      return {
         'showsTotal': this.options.showsTotal
      };
   },

   /**
    * This is the selector used to find the element
    * that the child views should be appended to
    */
   targetElement: 'tbody',

   attachHtml: function(collectionView, itemView){
      collectionView.$(this.targetElement).append(itemView.el);
   },

   /**
    * Creates helper functions for use by the template
    */
   templateHelpers: function () {
      var self = this;
      return {
         getOption: function(option) {
            return self.options[option];
         }
      };
   }
});

module.exports = TableBones;
