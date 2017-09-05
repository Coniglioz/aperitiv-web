Ext.define('Aperitiv.view.list.List', {
    extend: 'Ext.Panel',
    xtype: 'aperitiv',

    controller: 'list',

    layout: 'fit',

    localized: {
        title: '{list.title}'
    },

    items: [{
        xtype: 'list'
    }]
});