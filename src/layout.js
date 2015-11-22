/**
 * This is used to control what items are rendeder and how they are laid out
 *
 * Copyright 2015 Ethan Smith
 */

var CategorizedController = require('./controller/CategorizedController'),
    DifferenceController = require('./controller/DifferenceController');

var layout = [
   {
      'heading': 'Income Totals',
      'type': CategorizedController,
      'source': 'income',
      'options': {
         'title': 'Income Totals',
      }
   },
   {
      'type': CategorizedController,
      'source': 'incomerouting',
      'supplementary': {
         'categories': 'accounts'
      },
      'options': {
         'title': 'Income Routing',
         'hasSummary': false,
         'editable': true
      }
   },
   {
      'type': DifferenceController,
      'sources': {
         'minuend': 'income',
         'subtrahend': 'incomerouting'
      },
      'options': {
         'title': 'Unrouted Income',
         'classes': 'shouldZero'
      }
   },
   {
      'type': CategorizedController,
      'source': 'expenses',
      'options': {
         'title': 'Expenses',
      }
   },
   {
      'type': DifferenceController,
      'sources': {
         'subtrahend': 'expenses',
         'minuend': 'income'
      },
      'options': {
         'title': 'Monthly Net',
      }
   },
   {
      'type': CategorizedController,
      'source': 'funddraw',
      'supplementary': {
         'categories': 'funds'
      },
      'options': {
         'title': 'Fund Draws',
         'hasSummary': false,
         'editable': true
      }
   },
   {
      'type': DifferenceController,
      'sources': {
         'minuend': 'income',
         'subtrahend': 'funddraw'
      },
      'options': {
         'title': 'Unassigned Funds',
         'classes': 'shouldZero'
      }
   }
];

module.exports = layout;
