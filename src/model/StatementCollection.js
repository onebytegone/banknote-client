/**
 * A `StatementCollection` is a group of `Statement`s. This is used to
 * collect the statements into associated sets. For example, each statement
 * contains entries for a fund, the `StatementCollection` groups all of
 * those into a single data object.
 *
 * Copyright 2015 Ethan Smith
 */

var Backbone = require('backbone'),
    Statement = require('./Statement');

var StatementCollection = Backbone.Collection.extend({
   model: Statement
});

module.exports = StatementCollection;
