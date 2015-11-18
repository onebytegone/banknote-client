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

   it('should return a summed total', function() {
      var output = basicList.sumEntries();
      expect(output.get()).to.be(15);
   });

   it('should find entry based on hash', function() {
      var toFind = basicList.at(3);
      var found = basicList.findEntryWithHash(toFind.hash());
      expect(found).to.be(toFind);

      var notfound = basicList.findEntryWithHash('9999');
      expect(notfound).to.be(undefined);
   });
});
