//var greetings = require('./src/greetings');
//alert(greetings('Jose'));

var _ = require('underscore');
var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;
var TableCollection = require('./src/model/TableCollection');

var App = Backbone.View.extend({
   el: $('body'), // attaches `this.el` to an existing element.

   initialize: function(){
      _.bindAll(this, 'render'); // fixes loss of context for 'this' within methods

      var tables = new TableCollection();

//      this.render(); // not all views are self-rendering. This one is.

      var that = this;
      tables.fetch({
        success: function () {
            console.log(tables);
            that.render();
        }
      });
   },

   render: function(){
      $(this.el).append("<ul> <li>hello world</li> </ul>");
   }
});

var app = new App();
