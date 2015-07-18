var Marionette = require('backbone.marionette'),
    Syphon = require('backbone.syphon');

var AddEntryForm = Marionette.ItemView.extend({
   template: "#form-addentry",
   title: "Add Entry",

   submitAction: function () {
      this.trigger('on:submit', Syphon.serialize(this));
   },

   getSubmitAction: function() {
      var self = this;
      return function () {
         self.submitAction();
      };
   }
});


module.exports = AddEntryForm;
