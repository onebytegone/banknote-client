/**
 * This is used to control what items are rendeder and how they are laid out
 *
 * Copyright 2015 Ethan Smith
 */

var CategorizedController = require('./controller/CategorizedController'),
    DifferenceController = require('./controller/DifferenceController'),
    ProgressiveValueController = require('./controller/ProgressiveValueController'),
    EntryListController = require('./controller/EntryListController');

var layout = [
   {
      'type': EntryListController,
      'source': 'income',
      'options': {
         'title': 'Income Entries',
         'classes': 'list halfwidth alignleft',
         'columns': {
            'Date': 'date',
            'Name': 'name',
            'Value': {
               'field': 'amount',
               'parser': function(value) {
                  return value.readable();
               }
            }
         }
      }
   },
   {
      'type': EntryListController,
      'source': 'expenses',
      'options': {
         'title': 'Expenses',
         'classes': 'list halfwidth alignleft',
         'columns': {
            'Date': 'date',
            'Name': 'name',
            'Value': {
               'field': 'amount',
               'parser': function(value) {
                  return value.readable();
               }
            }
         }
      }
   },
   {
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
      'type': 'bundle',
      'options': {
         'title': 'Fund Routing'
      },
      'items': [
         {
            'type': CategorizedController,
            'source': 'fundrouting',
            'supplementary': {
               'categories': 'funds'
            },
            'options': {
               'title': 'To Fund',
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
               'title': 'Unassigned',
               'classes': 'shouldZero'
            }
         }
      ]
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
      'type': ProgressiveValueController,
      'sources': {
         'minuend': 'fundrouting',
         'subtrahend': 'funddraw'
      },
      'supplementary': {
         'categories': 'funds'
      },
      'options': {
         'title': 'Fund Status',
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
      'type': 'bundle',
      'options': {
         'title': 'Accounts'
      },
      'items': [
         {
            'type': ProgressiveValueController,
            'sources': {
               'minuend': 'incomerouting',
               'subtrahend': 'expenses'
            },
            'supplementary': {
               'categories': 'accounts'
            },
            'options': {
               'title': 'Expected EOM Totals',
            }
         },
         {
            'type': CategorizedController,
            'source': 'accounteom',
            'supplementary': {
               'categories': 'accounts'
            },
            'options': {
               'title': 'Actual EOM Totals',
               'hasSummary': false,
               'editable': true
            }
         }
      ]
   },
];

module.exports = layout;
