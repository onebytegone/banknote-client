var expect = require('expect.js'),
    AmountEntry = require('../../src/model/AmountEntry'),
    MoneyStack = require('moneystack');

describe('AmountEntry', function() {
   it('should return the first month date', function() {
      expect(new AmountEntry({
         'date': '1/1'
      }).getDateOfMonth()).to.be('1/1');

      expect(new AmountEntry({
         'date': '1/2'
      }).getDateOfMonth()).to.be('1/1');

      expect(new AmountEntry({
         'date': '6/6'
      }).getDateOfMonth()).to.be('6/1');

      expect(new AmountEntry({
         'date': '2015/6/2'
      }).getDateOfMonth()).to.be('6/1');
   });

   it('should have the same hash if the values are identical', function() {
      var a, b;

      a = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '2/1',
         category: 'income'
      });

      b = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '2/1',
         category: 'income'
      });

      expect(a.hash()).to.be(b.hash());
      expect(a.hash()).to.not.be('');
   });

   it('should have a different hash if the values are different', function() {
      var a, b;

      a = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '2/1',
         category: 'income'
      });

      b = new AmountEntry({
         amount: new MoneyStack(20),
         name: 'Stuffs',
         date: '2/1',
         category: 'income'
      });

      expect(a.hash()).to.not.be(b.hash());

      a = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Other',
         date: '2/1',
         category: 'income'
      });

      b = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '2/1',
         category: 'income'
      });

      expect(a.hash()).to.not.be(b.hash());

      a = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '10/5',
         category: 'income'
      });

      b = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '2/1',
         category: 'income'
      });

      expect(a.hash()).to.not.be(b.hash());

      a = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '2/1',
         category: 'expense'
      });

      b = new AmountEntry({
         amount: new MoneyStack(10),
         name: 'Stuffs',
         date: '2/1',
         category: 'income'
      });

      expect(a.hash()).to.not.be(b.hash());
   });
});
