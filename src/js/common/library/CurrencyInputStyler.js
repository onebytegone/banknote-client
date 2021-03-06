var $ = require('jquery');

(function() {
   var filterSymbol = function(value) {
      return value.replace(/[^\d.]/g, '');
   };

   $(document).on('focus', '.jsCurrency', function() {
      var elem = $(this),
          val = filterSymbol(elem.val());

      // If zero value, clear input for user
      if (parseFloat(val) === 0) {
         val = '';
      }

      // Remove zero value flag
      elem.closest('.zero').removeClass('zero');

      elem.val(val);
   });

   $(document).on('blur', '.jsCurrency', function() {
      var elem = $(this),
          val = elem.val();

      // Trim to float, e.g. 2112.123, then format to
      // 2 decimal places, e.g. 212.12, rounding as needed.
      val = parseFloat(val) || 0;

      if (val === 0) {
         elem.addClass('zero');
      }

      elem.val('$' + val.toFixed(2));
   });
})();
