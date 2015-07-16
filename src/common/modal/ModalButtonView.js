var Marionette = require('backbone.marionette'),
    $ = require('jquery'),
    _ = require('underscore');

var ModalButtonView = Marionette.ItemView.extend({
   tagName: 'div',
   template: false,

   addButton: function(name, classes, data, action) {
      var button = $('<button type="button"></button>');
      button.html(name);
      button.addClass('btn');
      button.addClass(classes);
      button.click(action);

      // We have to add the data this way as opposed to .data(), so the
      // data will actually apply to the object for backbone to use.
      _.mapObject(data, function(value, key) {
         button.attr('data-' + key, value);
      });
      this.$el.append(button);
   }
});

module.exports = ModalButtonView;
