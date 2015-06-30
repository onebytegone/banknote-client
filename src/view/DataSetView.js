var Marionette = require('backbone.marionette');

var DataSetView = Marionette.LayoutView.extend({
   template: "#template-dataset",

   regions: {
      rendered: "#rendered"
   },

   triggers: {
      "click .add": "add:click"
   }
});

module.exports = DataSetView;
