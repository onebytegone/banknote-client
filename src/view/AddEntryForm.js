var Marionette = require('backbone.marionette'),
    Syphon = require('backbone.syphon');

var AddEntryForm = Marionette.ItemView.extend({
   template: "#form-addentry",
   title: "Add Entry",

   events: {
      "click button.js-submit": "submitClicked"
   },

   submitClicked: function(e){
      e.preventDefault();
      var data = Syphon.serialize(this);
      this.trigger("form:submit", data);
   }
});


module.exports = AddEntryForm;
