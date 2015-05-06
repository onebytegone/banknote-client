var Marionette = require('backbone.marionette'),
    TableCollection = require('../model/TableCollection'),
    ListView = require('./ListView');

var PageLayout = Marionette.LayoutView.extend({
   template: "#template-main",

   regions: {
      elements: "#elements"
   },

   onBeforeShow: function() {
      var tables = new TableCollection();
      this.showChildView('elements', new ListView({
         collection: tables
      }));
      tables.fetch();
   }
});

module.exports = PageLayout;
