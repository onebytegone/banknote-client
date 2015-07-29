var expect = require('expect.js'),
    AmountEntry = require('../../src/model/AmountEntry');

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
});
