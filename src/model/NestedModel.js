var _ = require('underscore');
var Backbone = require('backbone');

var NestedModel = Backbone.Model.extend({
   template : {
      // 'json key' : Model Class
   },

   parse : function(response){
      return _.mapObject(this.template, function (modelType, key) {
         return new modelType(response[key], { parse : true });
      });
   },

   toJSON : function() {
      return _.mapObject(this._super(), function (submodel) {
         return submodel.toJSON();
      });
   }
});

module.exports = NestedModel;
