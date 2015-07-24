var Marionette = require('backbone.marionette');

var TableBones = Marionette.CompositeView.extend({
   tagName: 'table',
   className: 'table',

   attachHtml: function(collectionView, itemView){
      collectionView.$('tbody').append(itemView.el);
   }
});

module.exports = TableBones;
