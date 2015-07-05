var Marionette = require('backbone.marionette'),
    _ = require('underscore'),
    $ = require('jquery');

var RegionModal = Marionette.Region.extend({
  el: "#modal",

   constructor: function(){
      _.bindAll(this, 'getEl', 'showModal', 'hideModal');
      Marionette.Region.prototype.constructor.apply(this, arguments);
      this.on("view:show", this.showModal, this);
   },

   getEl: function(selector){
      var $el = $(selector);
      $el.on("hidden", this.close);
      return $el;
   },

   showModal: function(view){
      view.on("close", this.hideModal, this);
      this.$el.modal('show');
   },

   hideModal: function(){
      this.$el.modal('hide');
   },

   present: function(view) {
      var layout = new RegionModalLayout();
      this.show(layout);
      layout.getRegion('content').show(view);
   }
});


var RegionModalLayout = Marionette.LayoutView.extend({
   template: "#modal-view-template",

   regions: {
      content: "#content"
   },

   onRender: function () {
       // Get rid of that pesky wrapping-div.
       // Assumes 1 child element present in template.
       this.$el = this.$el.children();
       // Unwrap the element to prevent infinitely
       // nesting elements during re-render.
       this.$el.unwrap();
       this.setElement(this.$el);
   }
});

module.exports = RegionModal;
