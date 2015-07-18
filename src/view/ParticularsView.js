var Marionette = require('backbone.marionette');

var ParticularsView = Marionette.LayoutView.extend({
   template: "#template-particulars",
   className: 'particulars',

   regions: {
      rendered: ".jsRendered"
   },

   triggers: {
      "click .add": "add:click"
   }
});

module.exports = ParticularsView;
