var $ = require('jquery');

(function() {
   var filterSymbol = function(value) {
      return value.replace(/[^\d.]/g, '');
   };

   $(document).on('focus', '.jsCurrency', function() {
      var elem = $(this);
      elem.val(filterSymbol(elem.val()));
   });

   $(document).on('blur', '.jsCurrency', function() {
      var elem = $(this);

      //TODO: Add value validation

      elem.val('$' + elem.val());
   });
})();
