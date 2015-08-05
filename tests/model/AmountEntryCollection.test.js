var expect = require('expect.js'),
    _ = require('underscore'),
    AmountEntryCollection = require('../../src/model/AmountEntryCollection'),
    MoneyStack = require('moneystack');

describe('AmountEntryCollection', function() {
   var basicList = new AmountEntryCollection([
      {
         'date': '1/2',
         'category': 'first',
         'amount': new MoneyStack(4)
      },
      {
         'date': '3/1',
         'category': 'first',
         'name': 'misc',
         'amount': new MoneyStack(3)
      },
      {
         'date': '1/4',
         'category': 'second',
         'amount': new MoneyStack(1)
      },
      {
         'date': '11/12',
         'category': 'notused',
         'amount': new MoneyStack(7)
      }
   ]);

   it('should return a properly filtered set', function() {
      var output = basicList.collectionsByFilter(function(entry) {
         var category = entry.get('category');
         if (category === 'notused') {
            return null;
         }

         return category;
      });

      //TODO: This needs better testing. Currently difference in _byId prevents a straight compare.
      expect(_.size(output)).to.be(2);
      expect(output['first'].length).to.be(2);
      expect(output['second'].length).to.be(1);
   });

   it('should return a monthly summary', function() {
      var output = basicList.monthlySummary();
      expect(output.length).to.be(3);
      expect(output.at(0).get('date')).to.be('1/1');
      expect(output.at(0).get('amount').get()).to.be(5);
      expect(output.at(1).get('date')).to.be('3/1');
      expect(output.at(1).get('amount').get()).to.be(3);
      expect(output.at(2).get('date')).to.be('11/1');
      expect(output.at(2).get('amount').get()).to.be(7);
   });

   it('should return a summed total', function() {
      var output = basicList.sumEntries();
      expect(output.get()).to.be(15);
   });
});