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
      'source': 'routing',
      'options': {
         'title': 'Routing',
      }
   },
   {
      'type': DifferenceController,
      'sources': {
         'minuend': 'income',
         'subtrahend': 'routing'
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
   }
];

module.exports = layout;
