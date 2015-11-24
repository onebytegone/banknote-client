/**
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    AmountEntryCollection = require('./AmountEntryCollection');

var SummaryModel = Backbone.Model.extend({
   defaults: {
      headingLevel: 'h1',
      header: 'SummaryModel Header',
      classes: ''
   }
});

module.exports = SummaryModel;
