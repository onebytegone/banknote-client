var Marionette = require('backbone.marionette'),
    Syphon = require('backbone.syphon');

var AddEntryForm = Marionette.ItemView.extend({
   template: "#form-addentry",
   title: "Add Entry",

   onRender: function () {
      var dateInput = this.$el.find("input[type=date]");
      if (!dateInput.val()) {
         // Load with today's date when default value is falsey
         var now = new Date();
         var day = ('0' + now.getDate()).slice(-2);
         var month = ('0' + (now.getMonth() + 1)).slice(-2);
         var today = now.getFullYear() + '-' + month + '-' +  day;
         dateInput.val(today);
      }

      this.$el.find("#addentry-amount").val(this.model.get('amount').readable());
   },

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
