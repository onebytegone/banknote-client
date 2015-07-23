var Marionette = require('backbone.marionette'),
    MoneyStack = require('moneystack'),
    ListView = require('./ListView'),
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

      var listView = new ListView({
         'collection': this.model.get('entries')
      });
      this.getRegion('rendered').show(listView);

      this.on("add:click", function(args){
         var view = new AddEntryForm({
            'model' : new AmountEntry()
         });

         view.on('on:submit', function(data) {
            data.amount = new MoneyStack(data.amount);
            self.model.get('entries').add(new AmountEntry(data));
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
