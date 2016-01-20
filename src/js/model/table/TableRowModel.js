var Backbone = require('backbone');

var TableRowModel = Backbone.Model.extend({
   defaults: {
      prepended: null,
      appended: null,
      members: new Backbone.Collection()
   }
});

module.exports = TableRowModel;
