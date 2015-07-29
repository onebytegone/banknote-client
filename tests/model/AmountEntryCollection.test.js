var expect = require('expect.js'),
    _ = require('underscore'),
    AmountEntryCollection = require('../../src/model/AmountEntryCollection');

describe('AmountEntryCollection', function() {
   it('should return a properly filtered set', function() {
      var source = new AmountEntryCollection([
         {
            'date': '1/2',
            'category': 'first'
         },
         {
            'date': '3/1',
            'category': 'first',
            'name': 'misc'
         },
         {
            'date': '1/2',
            'category': 'second'
         },
         {
            'date': '11/12',
            'category': 'notused'
         }
      ]);

      var target = {
         'first': new AmountEntryCollection([
            {
               'date': '1/2',
               'category': 'first'
            },
            {
               'date': '3/1',
               'category': 'first',
               'name': 'misc'
            }
         ]),
         'second': new AmountEntryCollection([
            {
               'date': '1/2',
               'category': 'second'
            }
         ])
      };

      var output = source.collectionsByFilter(function(entry) {
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
});
