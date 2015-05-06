var Marionette = require('backbone.marionette');

var ListItem = Marionette.ItemView.extend({
   template: "#template-slice"
});

module.exports = ListItem;
