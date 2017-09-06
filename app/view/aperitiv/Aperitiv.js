Ext.define('Aperitiv.view.aperitiv.Aperitiv', {
    extend: 'Ext.Panel',
    xtype: 'aperitiv',

    layout: 'fit',

    localized: {
        title: '{list.title}'
    },

    items: [{
        xtype: 'aperitivlist'
    }]
});