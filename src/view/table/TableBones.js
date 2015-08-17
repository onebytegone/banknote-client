var Marionette = require('backbone.marionette');

var TableBones = Marionette.CompositeView.extend({
   tagName: 'table',
   className: 'table',

   /**
    * This is the selector used to find the element
    * that the child views should be appended to
    */
   targetElement: 'tbody',

   attachHtml: function(collectionView, itemView){
      collectionView.$(this.targetElement).append(itemView.el);
   }
});

module.exports = TableBones;
