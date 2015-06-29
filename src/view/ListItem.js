var Marionette = require('backbone.marionette');

var ListItem = Marionette.ItemView.extend({
  template: '#template-listitem',
  tagName: 'tr'
});

module.exports = ListItem;
