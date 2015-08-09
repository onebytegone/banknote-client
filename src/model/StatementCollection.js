var Backbone = require('backbone'),
    Statement = require('./Statement');

var StatementCollection = Backbone.Collection.extend({
   model: Statement
});

module.exports = StatementCollection;
