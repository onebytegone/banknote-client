var Marionette = require('backbone.marionette'),
    MoneyStack = require('moneystack'),
    MainLayout = require('./src/view/MainLayout'),
    ListView = require('./src/view/ListView'),
    DataSetView = require('./src/view/DataSetView'),
    AmountDataSet = require('./src/model/AmountDataSet'),
    AmountEntry = require('./src/model/AmountEntry'),
    AmountEntryCollection = require('./src/model/AmountEntryCollection');


var app = new Marionette.Application();

app.addRegions({
    appRegion: '#app'
});

app.addInitializer(function(options) {
   var layout = new MainLayout();
   app.appRegion.show(layout);

   var listView = new ListView({
      collection: options.model.get('entries')
   });

   var dataSetView = new DataSetView({
      model: options.model
   });

   layout.elements.show(dataSetView);
   dataSetView.getRegion('rendered').show(listView);
});

app.start({
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
