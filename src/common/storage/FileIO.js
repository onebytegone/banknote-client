var FileIO = function() {

};

FileIO.prototype = {
   read: function(file) {
      var reader = new FileReader();

      reader.onload = function(event) {
         console.log(event.target.result);
      };

      reader.readAsText(file);
   }
};

module.exports = FileIO;
