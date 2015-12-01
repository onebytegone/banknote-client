/**
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    ControlBones = require('./ControlBones'),

    // Views
    SummaryBlock = require('../view/SummaryBlock');

var EntryListController = ControlBones.extend({
   title: 'Entry List',

   /**
    * @param collection AmountEntryCollection
    * @return SummaryBlock
    */
   render: function(collection) {
      // Assemble summary block
      var summary = new SummaryBlock({
         model: this._createSummaryModel()
      });

      return summary;
   }
});

module.exports = EntryListController;
