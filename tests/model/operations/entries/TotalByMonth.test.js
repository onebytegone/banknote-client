var expect = require('expect.js'),
    AmountEntry = require('../../../../src/model/AmountEntry'),
    AmountEntryCollection = require('../../../../src/model/AmountEntryCollection'),
    TotalByMonth = require('../../../../src/model/operations/entries/TotalByMonth');

describe('TotalByMonth', function() {
   it('should total a set of amount entries by month', function() {
      var totaled = (new TotalByMonth()).run(new AmountEntryCollection([
         new AmountEntry({
            'date': '2016-01-01',
            'amount': 10
         }),
         new AmountEntry({
            'date': '2016-01-02',
            'amount': 15
         }),
         new AmountEntry({
            'date': '4/9',
            'amount': 8
         })
      ]));

      expect(totaled.at(0).get('date')).to.be('1/1');
      expect(totaled.at(0).get('amount').get()).to.be(25);
      expect(totaled.at(1).get('date')).to.be('2/1');
      expect(totaled.at(1).get('amount').get()).to.be(0);
      expect(totaled.at(2).get('date')).to.be('3/1');
      expect(totaled.at(2).get('amount').get()).to.be(0);
      expect(totaled.at(3).get('date')).to.be('4/1');
      expect(totaled.at(3).get('amount').get()).to.be(8);
      expect(totaled.at(11).get('date')).to.be('12/1');
      expect(totaled.at(11).get('amount').get()).to.be(0);
   });
});
