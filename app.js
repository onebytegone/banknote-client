var Backbone = require('backbone'),
    Marionette = require('backbone.marionette'),
    MoneyStack = require('moneystack'),
    MainLayout = require('./src/view/MainLayout'),
    ParticularsCollection = require('./src/view/ParticularsCollection'),
    AmountDataSet = require('./src/model/AmountDataSet'),
    AmountEntry = require('./src/model/AmountEntry'),
    AmountEntryCollection = require('./src/model/AmountEntryCollection'),
    RegionModal = require('./src/common/modal/RegionModal.js');


var Banknote = new Marionette.Application();

Banknote.addRegions({
   central: '#app',
   modal: RegionModal
});

Banknote.addInitializer(function(options) {
   var layout = new MainLayout();
   Banknote.central.show(layout);

   var particularsCollection = new ParticularsCollection({
      'collection' :  new Backbone.Collection(options.tables)
   });
   layout.elements.show(particularsCollection);
});

Banknote.start({
   tables: [
      new AmountDataSet({
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
      }),
      new AmountDataSet({
         name: 'Income',
         entries: new AmountEntryCollection([
            new AmountEntry({
               amount: new MoneyStack(4),
               name: 'Interest',
               date: '1/2'
            }),
            new AmountEntry({
               amount: new MoneyStack(200),
               name: 'Paycheck',
               date: '3/4'
            })
         ])
      })
   ]
});

// Make Banknote available globally
global.Banknote = Banknote;
