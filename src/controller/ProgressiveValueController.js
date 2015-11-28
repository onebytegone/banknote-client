/**
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    MoneyStack = require('MoneyStack'),
    CategorizedController = require('./CategorizedController'),

    // Model
    StatementCollection = require('../model/StatementCollection'),
    Statement = require('../model/Statement'),
    StatementsByCategory = require('../model/operations/statements/StatementsByCategory'),
    EntryCollectionNegator = require('../model/operations/entries/EntryCollectionNegator'),
    LinearEntrySum = require('../model/operations/entries/LinearEntrySum'),
    TotalByMonth = require('../model/operations/entries/TotalByMonth'),
    ProgressiveEntrySum = require('../model/operations/entries/ProgressiveEntrySum');


var ProgressiveValueController = CategorizedController.extend({
   hasSummary: false,

   _generateModel: function (collections, supplementary) {
      var categoryPreference = supplementary ? _.pluck(supplementary.categories || [], 'key') : [],
          minuendCategorized = (new StatementsByCategory()).run(collections.minuend, categoryPreference),
          subtrahendCategorized = (new StatementsByCategory()).run(collections.subtrahend, categoryPreference);

      return _.reduce(categoryPreference, function(memo, categoryKey) {
         var minuend, subtrahend, netEntries, progressiveEntries,
             initialValue = new MoneyStack(_.findWhere(supplementary.categories, { key: categoryKey }).starting),
             output = new Statement({
                key: categoryKey
             });

         minuend = minuendCategorized.findWhere({
            key: categoryKey
         }).get('entries');
         minuend = (new TotalByMonth()).run(minuend);

         subtrahend = subtrahendCategorized.findWhere({
            key: categoryKey
         }).get('entries');
         subtrahend = (new TotalByMonth()).run(subtrahend);

         subtrahend = (new EntryCollectionNegator()).run(subtrahend);
         netEntries = (new LinearEntrySum()).run(minuend, subtrahend);

         progressiveEntries = (new ProgressiveEntrySum()).run(netEntries, initialValue);

         output.set('entries', progressiveEntries);

         memo.push(output);

         return memo;
      }, new StatementCollection());
   },

   _bindEditableEvents: function() {
      // nothing to do here, editing is not support for this type
   }
});

module.exports = ProgressiveValueController;
