var _ = require('underscore'),
    AmountEntry = require('../../AmountEntry'),
    EntriesBySequence = require('./EntriesBySequence');

var ProgressiveEntrySum = function() { };

ProgressiveEntrySum.prototype = {
   /**
    * This calculates the progressive total for all of the entries in an
    * AmountEntryCollection. The value on the new item is the sum of the
    * current item and the last item.
    *
    * @param entries AmountEntryCollection
    * @param initial MoneyStack
    * @return AmountEntryCollection
    */
   run: function(entries, initial) {
      return (new EntriesBySequence()).run(entries, function(last, current) {
         var forged = current.clone();
         forged.set('amount', forged.get('amount').plus(last.get('amount')));
         return forged;
      }, new AmountEntry({
         'amount': initial
      }));
   }
};

module.exports = ProgressiveEntrySum;
