var Marionette = require('backbone.marionette'),
    ParticularsView = require('./ParticularsView');

var ParticularsCollection = Marionette.CollectionView.extend({
   childView: ParticularsView
});

module.exports = ParticularsCollection;
