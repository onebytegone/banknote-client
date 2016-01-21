var Backbone = require('backbone');

var TableModel = Backbone.Model.extend({
   defaults: {
      header: null,
      members: new Backbone.Collection()
   }
});

module.exports = TableModel;
