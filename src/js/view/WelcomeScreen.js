/**
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    _ = require('underscore');

var WelcomeScreen = Marionette.ItemView.extend({
   template: '#template-welcomeScreen',
   tagName: 'div',
   className: 'welcomeScreen',
   onRender: function (argument) {
      var self = this;

      this.$el.find('a.jsNewSheet').on('click', function() {
         self.trigger('click:newsheet');
      });

      this.$el.find('input[type=file]').on('change', function() {
         var elem = $(this);
         self.trigger('select:file', _.first(elem.get(0).files));
      });
   }
});

module.exports = WelcomeScreen;
