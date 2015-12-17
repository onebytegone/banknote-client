/**
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var WelcomeScreen = Marionette.ItemView.extend({
   template: '#template-welcomeScreen',
   tagName: 'div',
   className: 'welcomeScreen',
   onRender: function (argument) {
      var self = this;
      this.$el.find('a.jsNewSheet').on('click', function() {
         self.trigger('click:newsheet');
      });
   }
});

module.exports = WelcomeScreen;
