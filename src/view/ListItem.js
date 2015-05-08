var Marionette = require('backbone.marionette');

var ListItem = Marionette.ItemView.extend({
   template: "#template-slice",
   serializeData: function () {
      console.log("ListItem: ");
      console.log(this.model.toJSON());
      return this.model.toJSON();
   }
});

module.exports = ListItem;
