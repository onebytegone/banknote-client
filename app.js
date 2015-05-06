var _ = require('underscore');
var Marionette = require('backbone.marionette');
var TableCollection = require('./src/model/TableCollection'),
    ListItem = require('./src/view/ListItem');


var ListView = Marionette.CompositeView.extend({
   template: '#template-itemlist',
   childView: ListItem,
   childViewContainer: '#items'
});


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


var app = new Marionette.Application();

app.addRegions({
    appRegion: '#app'
});

app.addInitializer(function(options) {
    app.appRegion.show(new PageLayout());
});

app.start();
