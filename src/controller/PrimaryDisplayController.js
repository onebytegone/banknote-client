/**
 * Manages the creation and updating of the various
 * controllers for the layout.
 *
 * Copyright 2015 Ethan Smith
 */

var _ = require('underscore'),
    Marionette = require('backbone.marionette'),
    ControlBones = require('./ControlBones'),

    // Config
    Layout = require('../layout'),

    // View
    AffixedView = require('../view/AffixedView'),
    SummaryBlock = require('../view/SummaryBlock'),

    // Model
    AmountEntryCollection = require('../model/AmountEntryCollection'),
    SummaryModel = require('../model/SummaryModel');


var PrimaryDisplayController = function(options) {
   var self = this;

   // Copy all options to object
   _.each(options, function(value, key) {
      self[key] = value;
   });

   this.view = new AffixedView();
   this.data = {};
};


PrimaryDisplayController.prototype = {

   /**
    * @param rawData { ... } - Parsed data to render
    * @return Marionette.ItemView
    */
   render: function(rawData) {
      var self = this,
          subviews;

      this.view.empty();

      this.data = rawData;
      subviews = this._assembleSubviews(Layout, 0);

      this.view.once('show', function() {
         _.each(subviews, function (view) {
            self.view.affixOnShow(view);
         });
      });

      return this.view;
   },


   /**
    * Reloads the view from the stored data
    */
   rerender: function() {
      this.render(this.data);
      this.view.trigger('show');
   },


   /**
    * @param layout Layout
    * @param depth Integer
    * @return [Marionette.ItemView]
    */
   _assembleSubviews: function(layout, depth) {
      var self = this;

      return _.map(layout, function(config) {
         var preferredSource = config.sources || config.source,
             supplementary = config.supplementary,
             model = self._createCollection(self.data, preferredSource),
             type = config.type;

         // When `supplementary` is used, go and map the values to each of
         // the requested fields. Since we don't know what type they are
         // supposed to be, just copy the data across.
         if (supplementary) {
            supplementary = _.mapObject(supplementary, function (key) {
               return self.data[key];
            });
         }

         if (typeof type === 'function') {
            return self._createSubview(type, config, model, supplementary, depth);
         } else if (type === 'bundle') {
            return self._assembleBundle(config, depth);
         }

         throw "Unknown type: " + type;
      });
   },


   /**
    * @param config { ... }
    * @param depth Integer
    * @return Marionette.ItemView
    */
   _assembleBundle: function(config, depth) {
      var block = new SummaryBlock({
         model: new SummaryModel({
            nestDepth: depth,
            header: config.options.title
         })
      }),
         childViews =  this._assembleSubviews(config.items, depth + 1),
         container = new AffixedView();

      block.on('show', function() {
         block.content.show(container);
      });

      container.once('show', function() {
         _.each(childViews, function (view) {
            container.affixOnShow(view);
         });
      });

      return block;
   },


   /**
    * @param controllerType ControlBones
    * @param config { ... }
    * @param depth Integer
    * @return Marionette.ItemView
    */
   _createSubview: function(controllerType, config, model, supplementaryFields, depth) {
      var controller = new controllerType(_.defaults(config.options, { nestDepth: depth })),
          self = this;

      controller.on('collection:updated', function(collection) {
         if (config.source === undefined) {
            throw 'Update event was called when we do not have a single source. Multisource updates are not supported at this time.';
         }

         // Update the source data with the updates
         self.data[config.source] = collection.toJSON();

         self.rerender();
      });

      return controller.render(model, supplementaryFields);
   },


   /**
    * Recursively create the collections from its field name for the
    * source data. When the field is an object or array, try to create
    * sub models from its contents.
    *
    * @param rawData Object
    * @param field String, Array, Object
    * @return String, Array, or Object
    */
   _createCollection: function(rawData, field) {
      var self = this;

      if (Array.isArray(field)) {
         return _.map(field, function(sourceField) {
            return self._createCollection(rawData, sourceField);
         });
      } else if (field && (typeof field  === "object")) {
         return _.object(_.keys(field), self._createCollection(rawData, _.values(field)));
      }

      return new AmountEntryCollection(rawData[field]);
   }
};

module.exports = PrimaryDisplayController;
