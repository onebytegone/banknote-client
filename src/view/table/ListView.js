var TableBones = require('./TableBones'),
    ListItem = require('../ListItem');

var ListView = TableBones.extend({
   template: '#template-listview',
   childView: ListItem,
});

module.exports = ListView;
