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

      expect(new AmountEntry({
         'date': '2016-01-01'
      }).getDateOfMonth()).to.be('1/1');
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

   describe('Date Sanitization', function() {
      it('should use format of M/D', function() {
         var entry = new AmountEntry();
         expect(entry.sanitizeDate('1/1')).to.be('1/1');
         expect(entry.sanitizeDate('01/01')).to.be('1/1');
         expect(entry.sanitizeDate('5/10')).to.be('5/10');
      });

      it('should convert MM/DD/YYYY', function() {
         var entry = new AmountEntry();
         expect(entry.sanitizeDate('1/1/2016')).to.be('1/1');
         expect(entry.sanitizeDate('5/8/2016')).to.be('5/8');
      });

      it('should convert MM-DD-YYYY', function() {
         var entry = new AmountEntry();
         expect(entry.sanitizeDate('1-1-2016')).to.be('1/1');
         expect(entry.sanitizeDate('5-8-2016')).to.be('5/8');
      });

      it('should convert YYYY/MM/DD', function() {
         var entry = new AmountEntry();
         expect(entry.sanitizeDate('2016/1/1')).to.be('1/1');
         expect(entry.sanitizeDate('2016/01/01')).to.be('1/1');
         expect(entry.sanitizeDate('2016/5/8')).to.be('5/8');
         expect(entry.sanitizeDate('2016/05/08')).to.be('5/8');
      });

      it('should convert YYYY-MM-DD', function() {
         var entry = new AmountEntry();
         expect(entry.sanitizeDate('2016-1-1')).to.be('1/1');
         expect(entry.sanitizeDate('2016-01-01')).to.be('1/1');
         expect(entry.sanitizeDate('2016-5-8')).to.be('5/8');
         expect(entry.sanitizeDate('2016-05-08')).to.be('5/8');
      });

      it('returns false for invalid date', function() {
         var entry = new AmountEntry();
         expect(entry.sanitizeDate('abc')).to.be(false);
      });
   });
});
