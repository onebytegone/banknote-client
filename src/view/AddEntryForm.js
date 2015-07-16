var Marionette = require('backbone.marionette'),
    Syphon = require('backbone.syphon');

var AddEntryForm = Marionette.ItemView.extend({
   template: "#form-addentry",
   title: "Add Entry",

   events: {
      "click button.js-submit": "submitClicked"
   },

   getFormData: function () {
      return Syphon.serialize(this);
   }
});


module.exports = AddEntryForm;
