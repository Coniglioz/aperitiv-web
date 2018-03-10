Ext.define('Aperitiv.view.aperitiv.Aperitiv', {
    extend: 'Ext.Panel',
    xtype: 'aperitiv',
    reference: 'aperitiv',

    layout: 'card',

    localized: {
        title: '{list.title}'
    },

    header: {
        xtype: 'panelheader'
    },

    items: [{
        xtype: 'aperitivlist',
        itemId: 'aperitivList'
    }, {
        xtype: 'aperitivcreate',
        itemId: 'aperitivCreate'
    }]
});