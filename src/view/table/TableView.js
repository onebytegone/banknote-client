var Marionette = require('backbone.marionette');

var TableView = Marionette.CompositeView.extend({
   tagName: 'table',
   template: '#template-tableview',
   regions: {
      "header": "thead",
      "body": "tbody",
   }
});

module.exports = TableView;
