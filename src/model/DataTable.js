var $ = require('jquery');
var Backbone = require('backbone');
Backbone.$ = $;

var DataTable = Backbone.Model.extend({
    parse : function(response, options){
        console.log(response);
        return response;
    }
});

module.exports = DataTable;
