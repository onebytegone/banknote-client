var Marionette = require('backbone.marionette'),
    ListItem = require('./ListItem');

var ListView = Marionette.CompositeView.extend({
   tagName: 'table',
   template: '#template-listview',
   childView: ListItem,

   attachHtml: function(collectionView, itemView){
      collectionView.$('tbody').append(itemView.el);
   }
});

module.exports = ListView;
