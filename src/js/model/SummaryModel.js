/**
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    AmountEntryCollection = require('./AmountEntryCollection');

var SummaryModel = Backbone.Model.extend({
   defaults: {
      headingLevel: 'h1',
      nestDepth: 'depth0',
      header: 'SummaryModel Header',
      classes: ''
   },

   initialize: function(){
      if (typeof this.get('nestDepth') !== 'string') {
         this.set('nestDepth', SummaryModel.sanitizeNestDepth(this.get('nestDepth')));
      }
   }
});

SummaryModel.sanitizeNestDepth = function (depth) {
   if (depth < 0) {
      throw ('Negative nest depths are not supported.');
   }

   depth = Math.max(0, depth);

   return 'depth' + depth;
};

module.exports = SummaryModel;
