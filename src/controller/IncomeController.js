var _ = require('underscore'),
    ControlBones = require('./ControlBones'),
    AmountEntry = require('../model/AmountEntry'),
    AmountEntryCollection = require('../model/AmountEntryCollection'),
    ParticularsModel = require('../model/ParticularsModel'),
    StatementCollection = require('../model/StatementCollection'),
    StatementsByCategory = require('../model/operations/statements/StatementsByCategory'),
    TotalByMonth = require('../model/operations/entries/TotalByMonth'),
    MonthlyTable = require('../view/table/MonthlyTable');


var IncomeController = ControlBones.extend({
   render: function(data) {
      console.log('IncomeController:');
      console.log(data);

      var income = data.income;

      var collection = new AmountEntryCollection(_.map(income, function(note) {
         return new AmountEntry(note);
      }));

      var categorized = (new StatementsByCategory()).run(collection);
      var monthly = categorized.reduce(function(carry, statement) {
         statement.set(
            'entries',
            (new TotalByMonth()).run(statement.get('entries'))
         );
         carry.add(statement);
         return carry;
      }, new StatementCollection());

      return new ParticularsModel({
         name: 'Income Totals',
         dataset: monthly,
         displayType: MonthlyTable,
         editable: false
      });
   }
});

module.exports = IncomeController;
