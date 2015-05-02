var _ = require('underscore');
var Marionette = require('backbone.marionette');
var $ = require('jquery');
var TableCollection = require('./src/model/TableCollection');


var ListView = Marionette.ItemView.extend({
   initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

      var tables = new TableCollection();

      var that = this;
      tables.fetch({
        success: function () {
            console.log(tables.toJSON());
            that.render();
        }
      });
   },

   render: function(){
      $(this.el).append("<ul> <li>hello world</li> </ul>");
   }
});


var AppLayoutView = Marionette.LayoutView.extend({
   template: "#layout",

   regions: {
      elements: "#elements"
   },

   onBeforeShow: function() {
      this.showChildView('elements', new ListView());
   }
});


var app = new Marionette.Application();

app.addRegions({
    appRegion: '#app'
});

app.addInitializer(function(options) {
    app.appRegion.show(new AppLayoutView());
});

app.start();
