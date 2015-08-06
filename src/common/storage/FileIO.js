var $ = require('jquery');

var FileIO = function() {

};

FileIO.prototype = {
   read: function(file) {
      var reader = new FileReader();

      reader.onload = function(event) {
         console.log(event.target.result);
      };

      reader.readAsText(file);
   },

   save: function(data, filename) {
      var windowURL = window.URL || window.webkitURL,
          blob = new Blob([data], {type: 'text/plain'}),
          url = windowURL.createObjectURL(blob),
          a = $('<a></a>');

      a.attr('href', url);
      a.attr('download', filename);
      $('body').append(a);

      // Must use the vanilla JS object for click() to work
      a[0].click();

      // Clean up
      a.remove();
      windowURL.revokeObjectURL(url);
   }
};

module.exports = FileIO;
