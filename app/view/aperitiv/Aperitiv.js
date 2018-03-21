Ext.define('Aperitiv.view.aperitiv.Aperitiv', {
    extend: 'Ext.Panel',
    xtype: 'aperitiv',
    reference: 'aperitiv',

    layout: 'card',

    localized: {
        title: '{list.title}'
    },

    header: {
        xtype: 'panelheader',
        titlePosition: 0
    },

    items: [{
        xtype: 'aperitivlist',
        itemId: 'aperitivList'
    }, {
        xtype: 'aperitivcreate',
        itemId: 'aperitivCreate'
    }]
});