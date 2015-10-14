var _ = require('underscore'),
    ControlBones = require('./ControlBones'),
    AmountEntry = require('../model/AmountEntry'),
    AmountEntryCollection = require('../model/AmountEntryCollection'),
    ParticularsModel = require('../model/ParticularsModel'),
    StatementCollection = require('../model/StatementCollection'),
    StatementsByCategory = require('../model/operations/statements/StatementsByCategory'),
    TotalByMonth = require('../model/operations/entries/TotalByMonth'),
    EntryCollectionNegator = require('../model/operations/entries/EntryCollectionNegator'),
    LinearEntrySum = require('../model/operations/entries/LinearEntrySum'),
    MonthlySummary = require('../view/table/MonthlySummary');


var DifferenceController = ControlBones.extend({
   title: 'Difference Table',
   minuend: 'fieldnamehere',
   subtrahend: 'fieldnamehere',
   editable: false,  // Editable is not supported by this type

   render: function(data) {
      // Create an AmountEntryCollection from the raw data
      var minuendCollection = new AmountEntryCollection(_.map(data[this.minuend], function(note) {
         return new AmountEntry(note);
      }));

      // Convert the individual AmountEntry items to a set of monthly
      var minuendMonthy = (new TotalByMonth()).run(minuendCollection);

      // Create an AmountEntryCollection from the raw data
      var subtrahendCollection = new AmountEntryCollection(_.map(data[this.subtrahend], function(note) {
         return new AmountEntry(note);
      }));

      // Convert the individual AmountEntry items to a set of monthly
      var subtrahendMonthy = (new TotalByMonth()).run(subtrahendCollection);

      // Create the negated version so addition later works as subtraction
      subtrahendMonthy = (new EntryCollectionNegator()).run(subtrahendMonthy);

      // Add the two collections together
      var differenceMonthly = (new LinearEntrySum()).run(minuendMonthy, subtrahendMonthy);

      return new ParticularsModel({
         name: this.title,
         dataset: differenceMonthly,
         displayType: MonthlySummary,
         editable: false
      });
   }
});

module.exports = DifferenceController;
