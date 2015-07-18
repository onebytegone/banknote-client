var Marionette = require('backbone.marionette'),
    MoneyStack = require('moneystack'),
    MainLayout = require('./src/view/MainLayout'),
    ListView = require('./src/view/ListView'),
    ParticularsView = require('./src/view/ParticularsView'),
    AmountDataSet = require('./src/model/AmountDataSet'),
    AmountEntry = require('./src/model/AmountEntry'),
    AmountEntryCollection = require('./src/model/AmountEntryCollection'),
    AddEntryForm = require('./src/view/AddEntryForm'),
    RegionModal = require('./src/common/modal/RegionModal.js');


var Banknote = new Marionette.Application();

Banknote.addRegions({
    central: '#app',
    modal: RegionModal
});

Banknote.addInitializer(function(options) {
   var layout = new MainLayout();
   Banknote.central.show(layout);

   var listView = new ListView({
      collection: options.model.get('entries')
   });

   var particulars = new ParticularsView({
      model: options.model
   });

   particulars.on("add:click", function(args){
      var view = new AddEntryForm({
         model : new AmountEntry()
      });

      view.on('on:submit', function(data) {
         data.amount = new MoneyStack(data.amount);
         args.model.get('entries').add(new AmountEntry(data));
      });

      var buttons = [
         {
            label: 'Close',
            data: {'dismiss': 'modal'}
         },
         {
            label: 'Save',
            classes: 'btn-primary',
            handler: view.getSubmitAction()
         }
      ];

      Banknote.modal.present(view, buttons);
   });

   layout.elements.show(particulars);
   particulars.getRegion('rendered').show(listView);
});

Banknote.start({
   model: new AmountDataSet({
      name: 'Expenses',
      entries: new AmountEntryCollection([
         new AmountEntry({
            amount: new MoneyStack(4),
            name: 'Electric',
            date: '5/2'
         }),
         new AmountEntry({
            amount: new MoneyStack(12),
            name: 'Lunch',
            date: '5/4'
         })
      ])
   })
});
