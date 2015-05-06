var _ = require('underscore');
var Marionette = require('backbone.marionette');
var PageLayout = require('./src/view/PageLayout');

var app = new Marionette.Application();

app.addRegions({
    appRegion: '#app'
});

app.addInitializer(function(options) {
    app.appRegion.show(new PageLayout());
});

app.start();
