/**
 * Copyright 2015 Ethan Smith
 */

var Marionette = require('backbone.marionette');

var WelcomeScreen = Marionette.ItemView.extend({
   template: '#template-welcomeScreen',
   tagName: 'div',
   className: 'welcomeScreen'
});

module.exports = WelcomeScreen;
