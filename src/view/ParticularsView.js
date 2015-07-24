var Marionette = require('backbone.marionette'),
    MoneyStack = require('moneystack'),
    AddEntryForm = require('./AddEntryForm'),
    AmountEntry = require('../model/AmountEntry');

var ParticularsView = Marionette.LayoutView.extend({
   template: "#template-particulars",
   className: 'particulars',

   regions: {
      rendered: ".jsRendered"
   },

   triggers: {
      "click .add": "add:click"
   },

   onRender: function() {
      var self = this;

      var display = new (this.model.get('displayType'))({
         'collection': this.model.get('dataset')
      });
      this.getRegion('rendered').show(display);

      this.on("add:click", function(args){
         var view = new AddEntryForm({
            'model' : new AmountEntry()
         });

         view.on('on:submit', function(data) {
            data.amount = new MoneyStack(data.amount);
            self.model.get('dataset').add(new AmountEntry(data));
         });

         var buttons = [
            {
               'label': 'Close',
               'data': {'dismiss': 'modal'}
            },
            {
               'label': 'Save',
               'classes': 'btn-primary',
               'handler': view.getSubmitAction()
            }
         ];

         Banknote.modal.present("Add expense", view, buttons);
      });
   }
});

module.exports = ParticularsView;
