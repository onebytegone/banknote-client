/**
 * Renders a row with a column for each month
 *
 * Copyright 2015 Ethan Smith
 */

 var Backbone = require('backbone'),
    _ = require('underscore'),
    TableRow = require('../TableRow');

var TableMonthRow = TableRow.extend({
   onBeforeRender: function() {
      this.model = new Backbone.Model({
         'members': new Backbone.Collection(
            _.map([
               'January',
               'February',
               'March',
               'April',
               'May',
               'June',
               'July',
               'August',
               'September',
               'October',
               'November',
               'December'
            ], function(name) {
               return { 'text': name };
            }),
            Backbone.Model.extend({
               'text': ''
            })
         )
      });
   }
});

module.exports = TableMonthRow;
