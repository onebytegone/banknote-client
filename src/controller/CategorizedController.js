var _ = require('underscore'),
    ControlBones = require('./ControlBones'),
    AmountEntry = require('../model/AmountEntry'),
    AmountEntryCollection = require('../model/AmountEntryCollection'),
    ParticularsModel = require('../model/ParticularsModel'),
    StatementCollection = require('../model/StatementCollection'),
    StatementsByCategory = require('../model/operations/statements/StatementsByCategory'),
    TotalByMonth = require('../model/operations/entries/TotalByMonth'),
    MonthlyTable = require('../view/table/MonthlyTable');


var CategorizedController = ControlBones.extend({
   title: 'Categorized Table',
   source: 'fieldnamehere',
   editable: false,

   render: function(data) {
      var collection = new AmountEntryCollection(_.map(data[this.source], function(note) {
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
         name: this.title,
         dataset: monthly,
         displayType: MonthlyTable,
         editable: this.editable
      });
   }
});

module.exports = CategorizedController;
