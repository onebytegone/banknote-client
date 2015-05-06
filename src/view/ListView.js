var Marionette = require('backbone.marionette'),
    ListItem = require('./ListItem');

var ListView = Marionette.CompositeView.extend({
   template: '#template-itemlist',
   childView: ListItem,
   childViewContainer: '#items'
});

module.exports = ListView;
