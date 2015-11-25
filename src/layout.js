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
      'type': 'bundle',
      'options': {
         'title': 'Income Routing'
      },
      'items': [
         {
            'type': CategorizedController,
            'source': 'incomerouting',
            'supplementary': {
               'categories': 'accounts'
            },
            'options': {
               'title': 'Distribution',
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
         }
      ]
   },
   {
      'type': CategorizedController,
      'source': 'fundrouting',
      'supplementary': {
         'categories': 'funds'
      },
      'options': {
         'title': 'Fund Routing',
         'hasSummary': false,
         'editable': true
      }
   },
   {
      'type': DifferenceController,
      'sources': {
         'minuend': 'income',
         'subtrahend': 'fundrouting'
      },
      'options': {
         'title': 'Unassigned Funds',
         'classes': 'shouldZero'
      }
   },
   {
      'type': 'bundle',
      'options': {
         'title': 'Expense Routing'
      },
      'items': [
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
               'minuend': 'expenses',
               'subtrahend': 'funddraw'
            },
            'options': {
               'title': 'Undrawn Expenses',
               'classes': 'shouldZero'
            }
         }
      ]
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
   }
];

module.exports = layout;
